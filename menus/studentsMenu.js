const {MenuTemplate} = require("telegraf-inline-menu");
const MESSAGES = require("../models/messages.js");
const CONSTANTS = require("../models/constants.js");
const {chatMenu} = require("./chatMenu.js");
module.exports = {
    studentsMenu: (id, bot, app) => {
        const menu = new MenuTemplate(async (ctx) => "لیست دانش اموزان شما");
        let students = null;
        menu.chooseIntoSubmenu(
            "students",
            (ctx) => {
                students = CONSTANTS.getStudents(id, Number(ctx.match[1]));
                return students.map((el) => el.examId + "-" + el.chatId)
            },
            chatMenu(bot, app),
            {
                columns: 1,
                buttonText: (ctx, key) => {
                    let result = "";
                    students.forEach((el) => {
                        if (key == (el.examId + "-" + el.chatId)) {
                            const newMessages = CONSTANTS.getNewMessagesCount(id, Number(ctx.match[1].toString()));
                            result = el.FullName + ` (${newMessages})`;
                        }
                    });
                    return result;
                },
            }
        );
        menu.interact(CONSTANTS.backText(), "back", {
            do: () => ".."
        });
        return menu;
    },
};
