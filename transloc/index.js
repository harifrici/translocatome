var express = require('express');
var app = express();
var http = require("http");
var async = require("async");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var csv = require('fast-csv');
var fs = require('fs');

app.use(bodyParser.json());
app.use(function (req, res, next) {
  req.tpl = {};
  return next();
});

mongoose.connect('mongodb://127.0.0.1/translocatome');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var proteinSchema = mongoose.Schema({
  UniProtID: String,
  Major_loc: String,
  Minor_loc: String,
  goCode: String,
  exp_sys: String,
  src: String
});
var Protein = mongoose.model("Protein", proteinSchema);

var newProteinSchema = mongoose.Schema({
  UniProtID: String,
  majors: [
    {
      upID: String,
      minors: [
        {
          name: String,
          go: String,
          exp_sys: String,
          src: String
        }
      ]
    }
  ],
  go: String,
});
var asd = mongoose.model("asd", newProteinSchema);


app.get('/', function (req, res, next) {
  Protein.distinct("UniProtID", function(err, proteins){
    console.log(err);
    req.tpl.proteins = proteins.slice(0,10);
    next();
  });
}, function (req, res, next) {
    req.tpl.newProteins = []
    req.tpl.proteins.forEach(function(e, i) {
      var newProtein = {};
      newProtein.UniProtID = e;
      newProtein.majors = [];
      newProtein.exp_sys = [];
      newProtein.src = [];
      Protein.find({"UniProtID": e}, function(err, proteinsList){
        proteinsList.forEach(function(f, j) {
          var index = newProtein.majors.findIndex(x => x.upID === f.Major_loc);
          if(index < 0){
            index = newProtein.majors.length;
            newProtein.majors[index] = {};
            newProtein.majors[index].upID = f.Major_loc;
            newProtein.majors[index].minors = [];
          }
          newProtein.majors[index].minors.push({
            "name": f.Minor_loc,
            "go": f.goCode,
            "exp_sys": f.exp_sys,
            "src": f.src
          });
          var goData = getGO(e);
          if(j == proteinsList.length - 1){
            asd.update({"UniProtID": e}, newProtein, {upsert: true}, function(err, num){
              if(err) console.log(err);
            });
          }

        })
      });

    });
});

/*function getGO(protein) {
  var url = "http://www.ebi.ac.uk/QuickGO/GAnnotation?protein=" + protein + "&format=tsv";
  var allData = [];
  csv.fromStream(request(url),{objectMode: true, delimiter: '\t', headers: true})
      .on("data", function(data){
        allData.push(data);
      })
      .on("end", function(){
        console.log("done reading");
        allData.forEach(function(e){
          asd.update({"UniProtID": protein}, {$set: {'go': e["Aspect"]}}, function(err, num){
            if(err) console.log(err);
          });
        });

      });
}*/

app.get('/csv', function (req, res, next) {
  var csvStream = csv.format({headers: true}),
    writableStream = fs.createWriteStream("kimaradt.csv");

  writableStream.on("finish", function(){
    console.log("DONE!");
  }).on("error", function (err) {
    console.log("aaaaaaaaaaaaaaaa");
  });

  csvStream.pipe(writableStream).on("error", function (err) {
    console.log("aaaaaaaaaaaaaaaa");
  });

  function getCSV(array, index) {
    var url = "http://www.ebi.ac.uk/QuickGO/GAnnotation?protein=" + array[index] + "&format=tsv";
    var allData = [];

    var options = {
      url: url,
      timeout: 0
    }

    csv.fromStream(request(options).on("error", (e)=>{console.log(array[index]); getCSV(array, index+1)}),{objectMode: true, delimiter: '\t', headers: true})
        .on("error", function (err) {
          console.log("aaaaaaaaaaaaaaaa");
        })
        .on("data", function(data){
          allData.push(data);
        })
        .on("end", function(){
          var goFunction = "";
          var goProcess = "";
          var goComponent = "";
          allData.forEach(function(f){
            switch (f["Aspect"]) {
              case "Function":
                if(goFunction.indexOf(f["GO ID"]) < 0) {
                  goFunction += (goFunction.length > 0 ? "///" : "") + f["GO ID"];
                }
                break;
              case "Process":
                if(goProcess.indexOf(f["GO ID"]) < 0) {
                  goProcess += (goProcess.length > 0 ? "///" : "") + f["GO ID"];
                }
                break;
              case "Component":
                if(goComponent.indexOf(f["GO ID"]) < 0) {
                  goComponent += (goComponent.length > 0 ? "///" : "") + f["GO ID"];
                }
                break;
              default:

            }
          });
          csvStream.write({UniProtID: array[index], function: goFunction, process: goProcess, component: goComponent});
          if (array[index+1]) {
            getCSV(array, index+1);
          } else {
            csvStream.end();
          }
        });
  }

  proteins = ["P11177", "Q3LHN2", "Q5I0X4", "Q5BLP8"];
  getCSV(proteins, 0);

  /*Protein.distinct("UniProtID", function(err, proteins){
    if(err) console.log(err);
    var count = 0;
    var neg = [
      "P17174",
      "P24298",
      "Q8TD30",
      "P22303",
      "P06276",
      "P10635",
      "Q16678",
      "P08684",
      "P60709",
      "P68133",
      "P12883",
      "P35579",
      "P35580",
      "P13533",
      "P11055",
      "Q7Z406",
      "P35749",
      "P13535",
      "Q9UKX2",
      "Q71U36",
      "Q8WZ42",
      "P21439",
      "P49790",
      "O75694",
      "Q92621",
      "P05023",
      "P05026",
      "P13569",
      "Q9NS69",
      "Q15388",
      "O96008",
      "O94826",
      "Q99595",
      "Q9Y584",
      "O14925",
      "P21817",
      "Q12931",
      "Q9Y2W1",
      "Q92908",
      "Q9BRT6",
      "P62068",
      "O94822",
      "Q96MW1",
      "Q9BRQ3",
      "P0CJ78",
      "C9JN71",
      "A6NGB9",
      "Q9NUJ7",
      "A8MQ14",
      "B4DU55",
      "A8MUV8",
      "E7ETH6",
      "O14983",
      "O14975",
      "O14964",
      "P35558",
      "P15088",
      "P35548"
    ];
    var pos = [
      "Q14738",
      "Q00005",
      "Q15172",
      "P01112",
      "P02545",
      "P20339",
      "P18146",
      "Q7Z6G8",
      "Q6X4W1",
      "Q8IZP0",
      "P18848",
      "Q04206",
      "P27361",
      "P28482",
      "P48436",
      "P48431",
      "Q15717",
      "P36897",
      "P00533",
      "P21980",
      "P04406",
      "P09429",
      "P29966",
      "P68543",
      "Q15561",
      "A0A024R5Z9",
      "P00558",
      "P01116",
      "P15941",
      "Q07812",
      "P60484",
      "Q9GZX7",
      "Q16611",
      "P17612",
      "P04637",
      "P49759",
      "O14746",
      "Q9BSI4",
      "O94761",
      "P10071",
      "Q14247",
      "Q16665",
      "P04899",
      "P04150",
      "Q00839",
      "Q01105",
      "Q13043",
      "P10398",
      "P63000",
      "P49023",
      "O00141",
      "P99999",
      "Q07817",
      "Q06609",
      "Q99828"
    ];
    proteins = ["P11177", "Q3LHN2", "Q5I0X4", "Q5BLP8"];
    getCSV(proteins, 0);
    console.log("végevan");
    next();
  });*/
})
