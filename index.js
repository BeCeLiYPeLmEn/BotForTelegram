
const TelegramBot = require('node-telegram-bot-api');

const token = '445138642:AAFLiCODZoPEXR9mAznxd5cfWkJwcTuMvgc';

const bot = new TelegramBot(token, { polling: true });


const tasksInfo = require ('./tasksInfo.js');

const low = require('lowdb')
const FileSync =  require ('lowdb/adapters/FileSync')

const adapter = new FileSync ('db.json')
const db = low(adapter)

db.defaults ({ users: []}).write();



// <----Buttons---->
const startMenu = JSON.stringify({
     inline_keyboard: [
     [{ text: 'Получить задание!', callback_data:'getTask'}],
     [{ text: 'Статистика', callback_data:'stat'}]
     ]  
});

const leave = JSON.stringify({
    inline_keyboard: [
        [{ text: 'Сдаться', callback_data:'leave'}]
    ]
});

// <----The functional responsible for verifying the answers---->

bot.onText(/.+/,(msg,match) =>{
    if(msg.text == '/start'){
        if(!db.get('users').find({id:msg.chat.id}).value())
            db.get('users').push({id: msg.chat.id, task:0, correct:0, wrong:0, leaveMsgId:0}).write();
        bot.sendMessage(msg.chat.id,"Чего ты хочешь?", {reply_markup: startMenu});
    }
    else {
        let user = db.get('users').find ({id:msg.chat.id}).value();
        if (user.task!=0) {
            if (user.task.answer==msg.text){
            bot.editMessageReplyMarkup( null, {chat_id: msg.chat.id, message_id: user.leaveMsgId});
            user.leaveMsgId=0;
            bot.sendMessage(msg.chat.id,"Все правильно! Хочешь еще?",{reply_markup:startMenu});
            user.correct++;
            user.task=0;
        }
        else bot.sendMessage(msg.chat.id, "Не правильно");
        db.get('users').find({id:msg.chat.id}).assign(user).write();
    }
  
  }

});
    
 
    
//<----The functional responsible for issuing tasks and statistics ---->
   bot.on('callback_query',cbQuery => {
    const chatId = cbQuery.message.chat.id;
    const msgId = cbQuery.message.message_id;
    let user = db.get('users').find({id: chatId}).value();
     if (cbQuery.data=="getTask"){
        if(user.task==0) user.task = tasksInfo[Math.floor(Math.random() * tasksInfo.length)]; 
        bot.editMessageText('Загружаем задание', {chat_id: chatId, message_id:msgId});
        bot.sendPhoto(chatId,__dirname+'/./images/'+user.task.img,{reply_markup: leave})
           .then(data => {
            user.leaveMsgId = data.message_id;
            bot.editMessageText('Напиши мне ответ',{chat_id : chatId, message_id:msgId})});
     }
     if (cbQuery.data=='leave'){
        user.wrong++;
        bot.editMessageReplyMarkup(null, {chat_id: chatId, message_id: msgId});
        bot.sendMessage(chatId,'Правильный ответ: '+ user.task.answer);
        bot.sendMessage(chatId, 'Может еще?', {reply_markup:startMenu})
        user.task=0;
     }  
     if (cbQuery.data=='stat'){
        const cor = user.correct;
        const wr = user.wrong;
        bot.editMessageText(
            'Правильных: '+cor+'\nНерешённых: '+wr+'\nПроцент решённых: '+cor/(cor+wr)*100+'%',
            {reply_markup:startMenu, chat_id: chatId, message_id: msgId});
     }
     db.get('users').find({id: msgId}).assign(user).write();

 });    
   console.log('Сервер запущен')
    
