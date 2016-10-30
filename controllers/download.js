var https = require('https')
var fs = require('fs')

var Download = {

  init: function(url, dest, cb){

    var file = fs.createWriteStream(dest)
    var request = https.get(url, function(response){
      response.pipe(file)
      file.on('finish', function(){
        file.close()
        cb("Server Download Success!")
      })
    })

  },

  deleteFile: function(path, cb){

    fs.unlink(path, function(err){
      if(err) return console.log(err)
      //console.log("File delete Success");
      cb("File Delete Success!")
    })

  }
}
module.exports = Download
