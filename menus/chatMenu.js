const {MenuTemplate} = require("telegraf-inline-menu");
const MESSAGES = require("../models/messages.js");
const CONSTANTS = require("../models/constants.js");
module.exports = {
    chatMenu: (bot, app) => {
        const menu = new MenuTemplate(async (ctx) => {
            const goalChatId = Number(ctx.match[1].toString().split("-")[1]);
            const courseId = Number(ctx.match[1].toString().split("-")[0]);
            const messages = CONSTANTS.getTeacherMessages(ctx.from.id, courseId);
            //
            app.locals.chatUsers[ctx.from.id] = goalChatId;
            //
            await ctx.telegram.sendMessage(ctx.from.id, `*پیام های خوانده نشده*:`, {parse_mode: "Markdown",});
            for (const el of messages)
                await ctx.telegram.sendMessage(ctx.from.id, el);
            return "صحبت با" + CONSTANTS.getName(goalChatId).name;
        });
        bot.on("text", async (ctx) => {
            const goalChatId = Number(ctx.match[1].toString().split("-")[1]);
            CONSTANTS.sendMessageTo(ctx.from.id, goalChatId, ctx.message.text);
            if (app.locals.chatUsers[goalChatId])
                await ctx.telegram.sendMessage(goalChatId, ctx.message.text);
        });
        menu.interact(CONSTANTS.backText(), "back", {
            do: (ctx) => {
                app.locals.chatUsers[ctx.from.id] = null;
                return ".."
            }
        });
        return menu;
    },
};
