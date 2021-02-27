const {MenuTemplate} = require("telegraf-inline-menu");
const MESSAGES = require("../models/messages.js");
const CONSTANTS = require("../models/constants.js");
const {studentsMenu} = require("./studentsMenu.js");
module.exports = {
    teacherCoursesMenu: (id, bot, app) => {
        const menu = new MenuTemplate((ctx) => "دوره ها");
        const courses = CONSTANTS.getAllCourses(id);
        menu.chooseIntoSubmenu(
            "teacher",
            () => courses.map((el) => el.examId),
            studentsMenu(id, bot, app),
            {
                columns: 1,
                buttonText: (ctx, key) => {
                    let result = "";
                    courses.forEach((el) => {
                        if (key == el.examId) result = el.title + ` (${el.students})`;
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
