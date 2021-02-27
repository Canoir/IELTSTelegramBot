const CONSTANTS = require("./models/constants.js");
const {Markup, Scenes, session, Telegraf} = require('telegraf');

// Handler factories
const {enter, leave} = Scenes.Stage;

// Greeter scene
const greeterScene = new Scenes.BaseScene('greeter')
greeterScene.enter((ctx) => ctx.reply('Hi'))
greeterScene.leave((ctx) => ctx.reply('Bye'))
greeterScene.hears('hi', enter('echo'))
greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'))

// Echo scene
const echoScene = new Scenes.BaseScene('echo')
echoScene.enter((ctx) => ctx.reply('echo scene'))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

const bot = new Telegraf(CONSTANTS.BotToken);
const stage = new Scenes.Stage([greeterScene, echoScene], {
    ttl: 10,
})
bot.use(session())
bot.use(stage.middleware())
bot.command('greeter', async (ctx) => {
    const res = await ctx.scene.enter('greeter');
    ctx.reply("Greeter", Markup.keyboard([["Hi"], ["Leave"]]).oneTime().resize())
    return res;
})
bot.command('echo', (ctx) => ctx.scene.enter('echo'))
bot.start((ctx) =>
    ctx.reply("Hello", Markup.keyboard(['Hi', 'Echo']).oneTime().resize())
);
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))