const {MenuTemplate} = require("telegraf-inline-menu");
const MESSAGES = require("../models/messages.js");
const CONSTANTS = require("../models/constants.js");
const {studentsMenu} = require("./studentsMenu");
const {examTypesMenu} = require("./examTypesMenu.js");
const {coursesMenu} = require("./coursesMenu.js");
const {teacherCoursesMenu} = require("./teacherCoursesMenu.js");
module.exports = {
    mainMenu: (bot, app, middle) => {
        const menu = new MenuTemplate((ctx) => MESSAGES.welcomeMessage());
        menu.url("سایت ما", "https://lerne24.com");
        menu.interact("ورود", "login", {

            do: (ctx, path) => {
                const id = ctx.from.id;
                const role = CONSTANTS.checkRole(id);
                // if (role === CONSTANTS.Roles.Student) {
                //     const menu = new MenuTemplate((ctx) => MESSAGES.welcomeMessage());
                //     const count = CONSTANTS.getExamCounts(id);
                //     menu.submenu("ثبت نام آزمون", "IELTSRegister", examTypesMenu());
                //     menu.submenu(`دوره های ثبت نام شده (${count})`, "IELTSCourses", coursesMenu(id, bot, app));
                //     return menu;
                // } else if (role === CONSTANTS.Roles.Teacher) {
                //     const menu = new MenuTemplate((ctx) => MESSAGES.welcomeMessage());
                //     menu.submenu("لیست دوره ها", "IELTSStudents", teacherCoursesMenu(id, bot, app));
                //     return menu;
                // } else {
                //     return new MenuTemplate((ctx) => "Shit!");
                // }

                bot.navigate(ctx, "/student")
            }
        })
        return menu;
    }
};
