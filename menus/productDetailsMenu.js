const { MenuTemplate } = require("telegraf-inline-menu");
const CONSTANTS = require("../models/constants.js");
const MESSAGES = require("../models/messages.js");

module.exports = {
  productDetailsMenu: () => {
    const menu = new MenuTemplate((ctx) => {
      return {
        type: "photo",
        media: {
          source: `./assets/download.jpg`,
        },
        text:
          "*" +
          CONSTANTS.IELTSExamDetails(ctx.match[1], ctx.match[2]).title +
          "*\n" +
          CONSTANTS.IELTSExamDetails(ctx.match[1], ctx.match[2]).description +
          "\n\n" +
          "قیمت :\t*" +
          CONSTANTS.IELTSExamDetails(ctx.match[1], ctx.match[2]).price +
          "*",
        parse_mode: "Markdown",
      };
    });
    menu.url(
      CONSTANTS.buyProductButtonText(),
      (ctx) =>
        CONSTANTS.IELTSExamDetails(ctx.match[1], ctx.match[2], ctx.from.id)
          .payLink,
      {}
    );
    menu.interact(CONSTANTS.backText(), "backToIELTSTypeMenu", {
      do: () => "..",
    });
    return menu;
  },
};
