
const TelegramBot = require('node-telegram-bot-api');

const token = '445138642:AAFLiCODZoPEXR9mAznxd5cfWkJwcTuMvgc';

const bot = new TelegramBot(token, { polling: true });


const tasksInfo = require ('./tasksInfo.js');

const users = {};
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

bot.onText(/\/start/, (msg,match) => {
    users [msg.chat.id]={task:0, correct:0, wrong:0, leaveMsgId:0};
    bot.sendMessage(msg.chat.id,"Чего ты хочешь?", {reply_markup: startMenu});
});
    
        bot.onText(/.+/,(msg,match) => {
            if (users[msg.chat.id].task.getTaskInfo = true) {
            if (users[msg.chat.id].task!=0) {
                if (users[msg.chat.id].task.answer==msg.text){ 
                    bot.editMessageReplyMarkup( null, {chat_id: msg.chat.id, message_id:users[msg.chat.id].leaveMsgId});
                    users[msg.chat.id].leaveMsgId=0;
                    bot.sendMessage(msg.chat.id,'Все правильно! Хочешь еще?', {reply_markup: startMenu});
                    users[msg.chat.id].correct++;
                    users[msg.chat.id].task=0;
                }
                else bot.sendMessage(msg.chat.id, "Не правильно");
            }
        }
        });
    
//<----The functional responsible for issuing tasks and statistics ---->
   bot.on('callback_query',cbQuery => {
    const chatId = cbQuery.message.chat.id;
    const msgId = cbQuery.message.message_id;
     if (cbQuery.data=="getTask"){
        users [chatId].task= tasksInfo[Math.floor(Math.random() * tasksInfo.length)]; 
        bot.editMessageText('Загружаем задание', {chat_id: chatId, message_id:msgId});
        bot.sendPhoto(chatId,__dirname+'/./images/'+users[chatId].task.img,{reply_markup: leave})
           .then(data => {
            users [chatId].leaveMsgId = data.message_id;
            bot.editMessageText('Напиши мне ответ',{chat_id : chatId, message_id:msgId})});
     }
     if (cbQuery.data=='leave'){
        users[chatId].wrong++;
        bot.editMessageReplyMarkup(null, {chat_id: chatId, message_id: msgId});
        bot.sendMessage(chatId,'Правильный ответ: '+ users [chatId].task.answer);
        bot.sendMessage(chatId, 'Может еще?', {reply_markup:startMenu})
        users[chatId].task=0;
     }  
     if (cbQuery.data=='stat'){
        const cor = users[chatId].correct;
        const wr = users[chatId].wrong;
        bot.editMessageText(
            'Правильных: '+cor+'\nНерешённых: '+wr+'\nПроцент решённых: '+cor/(cor+wr)*100+'%',
            {reply_markup:startMenu, chat_id: chatId, message_id: msgId});
     }

 });    
   console.log('Сервер запущен')
    
