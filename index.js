// Библиотека, подключенная к боту
const TelegramBot = require('node-telegram-bot-api');
//Токен нашего бота
const token = '445138642:AAFLiCODZoPEXR9mAznxd5cfWkJwcTuMvgc';
// Активирование бота
const bot = new TelegramBot(token, { polling: true });
// Массив пользователя (JSON)
const users = {};
// Массив с заданиями
const tasks = [
// Сами задания
    {
    img:'5-1.jpg',
    answer:'111 '
    },
    {
    img:'5-2.jpg',
    answer:'110'
    },
    {
    img:'5-3.jpg' ,
    answer:'11'   
    },
    {
    img:'5-4.jpg',
    answer:'14'    
    },
    {
    img:'5-5.jpg',
    answer:'1011'    
    },
    {
    img:'9-1-1.jpg',
    answer:'24'    
    },
    {
    img:'9-1-2.jpg',
    answer:'10'    
    },
    {
    img:'9-1-3.jpg',
    answer:'7'    
    },
    {
    img:'9-1-4.jpg',
    answer:'16'    
    },
    {
    img:'9-1-5.jpg',
    answer:'28'    
    },
    {
    img:'9-2-1.jpg',
    answer:'1'    
    },
    {
    img:'9-2-2.jpg',
    answer:'3'    
    },
    {
    img:'9-2-3.jpg',
    answer:'3'    
    },
    {
    img:'9-2-4.jpg',
    answer:'4'    
    },
    {
    img:'9-2-5.jpg',
    answer:'2'    
    },
    {
    img:'10-1.jpg',
    answer:'ОАУАО'    
    },
    {
    img:'10-2.jpg',
    answer:'ОООУО'    
    },
    {
    img:'10-3.jpg',
    answer:'УААУО'    
    },
    {
    img:'10-4.jpg',
    answer:'УОУАУ'
    },
    {
    img:'10-5.jpg',
    answer:'АРККК'    
    },
];
// Объявление кнопки 'startMenu'
const startMenu =JSON.stringify({
// inline кнопка ( она в самом сообщении)    
    inline_keyboard:[
// что отображено в кнопке, название и тп    
        [{ text:'Я готов!', callback_data:'getTask'}]
    ]
});

//  На что отвечает бот (первый раз) 
bot.onText(/\/start/, (msg, match) => {
// После начала диалога присваивается значение 0
    users[msg.chat.id]={task:0};
// gg wp ( не надо объяснять)
    bot.sendMessage(msg.chat.id,'Привет дорогой друг');
    bot.sendMessage(msg.chat.id,'Я пришлю тебе случайное задание и ты должен его решить! Ты готов быть самым умным (НЕТ)',{reply_markup: startMenu});    
});
// сообщение пользователя (любое)
bot.onText(/.+/,(msg,match) =>{
// Если задание не равно 0, то...
     if(users[msg.chat.id].task!=0){
// Если ответ пользователя соотвествует правильному ответу, то...      
        if(users[msg.chat.id].task.answer==msg.text){
// То бот отвечает, что ты сделал правильно           
            bot.sendMessage(msg.chat.id,'Все правильно! Хочешь еще ?',{reply_markup: startMenu});
//  К id пользов. - задания обнуляются           
            users[msg.chat.id].task=0;            
        }
// Иначе не правильно        
        else bot.sendMessage(msg.chat.id,'Неправильно :(');
    }
});
//  я тупой овощ  и не помню))) (Фокин)))))
 bot.on('callback_query',cbQuery =>{
// Создаем константу , присваиваем значение -> сообщение -> id пользов.
    const chatId = cbQuery.message.chat.id; 
    if (cbQuery.data == 'getTask'){
// Стока с рандомом типо для пользов. кадаются рандомные задания из массива tasks
        users[chatId].task= tasks[Math.floor(Math.random() * tasks.length)];
        bot.sendPhoto(chatId,__dirname+'/./images/'+users[chatId].task.img);
    }
});
// Да.
console.log('Сервер запущен');