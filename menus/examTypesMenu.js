const {MenuTemplate} = require("telegraf-inline-menu");
const MESSAGES = require("../models/messages.js");
const CONSTANTS = require("../models/constants.js");
const {ieltsTypeMenu} = require("./ieltsTypeMenu.js");
module.exports = {
    examTypesMenu: () => {
        const menu = new MenuTemplate((ctx) => MESSAGES.welcomeRegisterMessage());
        const examTypes = CONSTANTS.ExamTypes();
        menu.chooseIntoSubmenu(
            "examType2",
            () => examTypes.map((el) => el.examTypeId),
            ieltsTypeMenu(),
            {
                buttonText: (ctx, key) => {
                    let result = "";
                    examTypes.forEach((el) => {
                        if (el.examTypeId == key) result = el.text;
                    });
                    return result;
                },
                columns: 2,
            }
        );
        menu.interact(CONSTANTS.backText(), "backToMenu", {
            do: () => "..",
        });
        return menu;
    },
};
