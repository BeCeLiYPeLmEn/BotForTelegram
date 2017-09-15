const TelegramBot = require('node-telegram-bot-api');

const token = '445138642:AAFLiCODZoPEXR9mAznxd5cfWkJwcTuMvgc';

const bot = new TelegramBot(token, { polling: true });

//const hel=["Дарова","Здарова","Хай","Гутен Так"];

bot.onText(/^\/start/, (msg, match) => {

    const chatId = msg.chat.id;
    bot.sendMessage(chatId,"Привет , друг.");
    bot.sendMessage(chatId, "Давай знакомится?");
});
bot.onText(/^Давай|Го$/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Меня зовут NaNik, а тебя ?");
});
bot.onText(/^Я (.+)$/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Приятно познакомится,"+match[1]);
});
bot.onText(/^А меня (.+)$/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Приятно познакомится,"+match[1]);
});

bot.onText(/^Ты (.+)$/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Сам такой");
});

bot.onText(/^Кто первый ?\| Кто первый $/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Лада конечно");
});
bot.onText(/^Как дела?|Как жизнь?/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Отлично , а у тебя ?");
});
bot.onText(/^Отлично|Хорошо|Заебца|Охуенно/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Ну и отлично.");
});
bot.onText(/^Плохо|Херово |Не очень|Так себе|Хуево/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "А почему?");
});

