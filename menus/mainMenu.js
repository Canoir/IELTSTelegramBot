const { MenuTemplate } = require("telegraf-inline-menu");
const MESSAGES = require("../models/messages.js");
const { examTypesMenu } = require("./examTypesMenu.js");
module.exports = {
  mainMenu: (bot) => {
    const menu = new MenuTemplate((ctx) => MESSAGES.welcomeMessage());
    menu.url("سایت ما", "https://lerne24.com");
    menu.submenu("ثبت نام آزمون", "IELTSRegister", examTypesMenu(bot));
    return menu;
  },
};
