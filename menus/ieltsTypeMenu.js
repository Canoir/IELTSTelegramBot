const { MenuTemplate } = require("telegraf-inline-menu/dist/source");
const MESSAGES = require("../models/messages");
const CONSTANTS = require("../models/constants.js");
const { productDetailsMenu } = require("./productDetailsMenu.js");

module.exports = {
  ieltsTypeMenu: (bot) => {
    const menu = new MenuTemplate((ctx) => {
      return MESSAGES.getIELTSTypesMessage();
    });
    const ieltsExamTypes = CONSTANTS.IELTSExamTypes();
    menu.chooseIntoSubmenu(
      "productDetails",
      () => ieltsExamTypes.map((el) => el.IELTSExamTypeId),
      productDetailsMenu(),
      {
        columns: 1,
        buttonText: (ctx, key) => {
          let result = "";
          ieltsExamTypes.forEach((el) => {
            if (key == el.IELTSExamTypeId) result = el.title;
          });
          return result;
        },
      }
    );
    menu.interact(CONSTANTS.backText(), "backToExamTypesMenu", {
      do: () => "..",
    });
    return menu;
  },
};
