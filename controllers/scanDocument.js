var config = require('./../config')
var request = require('request')

var Document = {

  getPath: function(id, cb){

    request(config.url + id, function(err, response, body){
      if (!err && response.statusCode == 200) {
        cb(body)
      }
    })
  },

  getDocument: function(path, cb){

    request(config.urlPath + path, function(err, response, doc){
      if (!err && response.statusCode == 200) {
        cb(doc)
      }
    })
  }

}
module.exports = Document
