var config = require('./../config')
var fs = require('fs')

var vt = require("node-virustotal");
var con = vt.MakePublicConnection();

// API KEY
con.setKey(config.APIKEY);
//console.log(con.getKey());

con.setDelay(15000);
//console.log(con.getDelay());


var virusTotal = {

  scanDocument: function(sfile, mime, cb){

    var parseName = sfile.split('\\').pop().split('/').pop();

    // File
    con.submitFileForAnalysis(sfile, mime, fs.readFileSync("./Download/" + parseName), function(data){
      console.log(data);
      cb(data)
    }, function(mistake){
      console.log(mistake);
    });

  },

  // Url
  scanUrl: function(url, cb){

    con.submitUrlForScanning(url,function(data){
      console.dir(data);
      cb(data)
    }, function(err){
      console.error(err);
    })
  },

  scanUrlAnalisis: function(url, cb){
    con.retrieveUrlAnalysis(url,function(data){
      console.dir(data);
      cb(data)
    }, function(err){
      console.error(err);
    })
  },

  resCan: function(id, cb){

    con.rescanFile(id, function(data){
      console.log(data)
      cb(data)
    }, function(mistake){
      console.log(mistake)
    })

  }
}

module.exports = virusTotal
