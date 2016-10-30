var config = require('./config')
var scanDocument = require('./controllers/scanDocument')
var total = require('./controllers/total')
var download = require('./controllers/download')

// Telegram
var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(config.token, {polling: true});

// local  __dirname
// heroku app
var downloadPath = __dirname + "/Download/"

//var resultUrl

bot.on("message", function(msg){

  var chatId = msg.chat.id
  //console.log(msg)

  if (msg.document || msg.photo) {
      console.log(downloadPath)
        console.log(pwd)

      scanDocument.getPath(msg.document.file_id, function(path){

        var parse = JSON.parse(path)
        //console.log(parse.result.file_path)

        //console.log(config.urlPath + parse.result.file_path)

        download.init(config.urlPath + parse.result.file_path, downloadPath + msg.document.file_name, function(data){
          console.log(data)
          //bot.sendMessage(chatId, data)

          if (data) {
            total.scanDocument(downloadPath + msg.document.file_name, msg.document.mime_type, function(data){
              //console.log(data)

              if(data){

                setTimeout(download.deleteFile(downloadPath + msg.document.file_name, function(data){
                  console.log(data);
                }), 3000)

                bot.sendMessage(chatId, 'Result ' + "\n" + data.permalink)
              }

            })
          }

        }) // End download.init

      }) // scanDocument.getPath
    }
})


// Scan Url
bot.onText(/\/scan (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var resp = match[1];

  total.scanUrl(resp, function(result){
    //console.log(result.permalink);

    if (result) {
      //resultUrl = result.permalink

      total.scanUrlAnalisis(result.permalink, function(data){
        //console.log(data);

        if (result.response_code == 1) {
          bot.sendMessage(chatId, 'Result ' + '\n' + result.permalink);
        }
      }) // End total.scanUrlAnalisis

    }

  }) // End total.scanUrl
})

// Start
bot.onText(/\/start/, function(msg){
  var chatId = msg.chat.id;
  //console.log(msg);
  bot.sendMessage(chatId, 'Introduce el comando /help para ver que puedes hacer.');
});

// Help
bot.onText(/\/help/, function(msg){
  var chatId = msg.chat.id;
  //console.log(msg);
  bot.sendMessage(chatId,
    '1- ' + 'Envia un archivo o foto y te mandara el link del analisis.' + '\n\n' +
    '2- ' + 'Si quieres analizar una url introduce el comando /scan + url.');
});
