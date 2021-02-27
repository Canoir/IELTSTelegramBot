const {MenuTemplate} = require("telegraf-inline-menu");
const MESSAGES = require("../models/messages.js");
const CONSTANTS = require("../models/constants.js");
const {chatMenu} = require("./chatMenu.js");
module.exports = {
    coursesMenu: (id,bot,app) => {
        const menu = new MenuTemplate((ctx) => "دوره ها");
        const courses = CONSTANTS.getCourses(id);
        menu.chooseIntoSubmenu(
            "coursesMenu",
            () => courses.map((el) => el.examId + "-" + el.teacherId),
            chatMenu(bot,app),
            {
                columns: 1,
                buttonText: (ctx, key) => {
                    let result = "";
                    courses.forEach((el) => {
                        if (key == (el.examId + "-" + el.teacherId)) result = el.title;
                    });
                    return result;
                },
            }
        );
        menu.interact(CONSTANTS.backText(), "back", {
            do: () => "..",
        });
        return menu;
    },
};
