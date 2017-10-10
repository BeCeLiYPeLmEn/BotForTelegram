
const TelegramBot = require('node-telegram-bot-api');

const token = '445138642:AAFLiCODZoPEXR9mAznxd5cfWkJwcTuMvgc';

const bot = new TelegramBot(token, { polling: true });


const tasksInfo = require ('./tasksInfo.js');
const tasksMat = require ('./tasksMat.js');

const users = {};

const startMenu = JSON.stringify({
     inline_keyboard: [
     [{ text: 'Хочу задание!', callback_data:'getTaskInfo'}]
     ]  
});


bot.onText(/\/start/, (msg,match) => {
    users [msg.chat.id]={task:0};
    bot.sendMessage(msg.chat.id,"Чего ты хочешь?", {reply_markup: startMenu});
});
    
        bot.onText(/.+/,(msg,match) => {
            if (users[msg.chat.id].task.getTaskInfo = true) {
            if (users[msg.chat.id].task!=0) {
                if (users[msg.chat.id].task.answer==msg.text){ 
                 bot.sendMessage(msg.chat.id,'Все правильно! Хочешь еще?', {reply_markup: startMenu});
                    const rand= tasksInfo[Math.floor(Math.random() * tasksInfo.length)];
                    console.log(rand);
                }
                else bot.sendMessage(msg.chat.id, "Не правильно");
            }
        }
        });
    

   bot.on('callback_query',cbQuery => {
    const chatId = cbQuery.message.chat.id;
    const msgId = cbQuery.message.message_id;
     if (cbQuery.data=="getTaskInfo"){
        users [chatId].task= tasksInfo[Math.floor(Math.random() * tasksInfo.length)]; 
        bot.editMessageText('Загружаем задание', {chat_id: chatId, message_id:msgId});
        bot.sendPhoto(chatId,__dirname+'/./images/'+users[chatId].task.img);
     }
   });    
    
