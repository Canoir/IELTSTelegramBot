const express = require("express");
const app = express();
const { MenuMiddleware } = require("telegraf-inline-menu");
const { Telegraf } = require("telegraf");
const CONSTANTS = require("./models/constants.js");
const { mainMenu } = require("./menus/mainMenu.js");
const { create } = require("./zarinpal/zarinpal.js");
app.locals.merchants = {};

const bot = new Telegraf(CONSTANTS.BotToken);
const middlware = new MenuMiddleware("/", mainMenu(bot));
bot.start((ctx) => middlware.replyToContext(ctx));
bot.use(middlware.middleware());
bot.launch();
//Pay
app.get("/pay", async (req, res) => {
  const { examType, ieltsType, phoneNumber } = req.query;
  if (examType && ieltsType && phoneNumber) {
    const product = CONSTANTS.IELTSExamDetails(
      examType,
      ieltsType,
      phoneNumber
    );
    const _res = await create(CONSTANTS.ZarinpalMetaKey, true).PaymentRequest({
      Amount: product.amount,
      CallbackURL: CONSTANTS.CallbackURL,
      Description: product.description,
      Email: CONSTANTS.ZarinpalInfo.Email,
      Mobile: CONSTANTS.ZarinpalInfo.PhoneNumber,
    });
    if (_res.status == 100) {
      addMerchant(phoneNumber, _res.authority, product.amount);
      res.redirect(_res.url);
    }
  } else {
    res.end();
  }
});
app.get("/payResult", async (req, res) => {
  const data = getMerchant(req.query.Authority);
  const zarinpal = create(CONSTANTS.ZarinpalMetaKey, false);
  const _res = await zarinpal.PaymentVerification({
    MerchantID: CONSTANTS.ZarinpalMetaKey,
    Amount: data.amount,
    Authority: req.query.Authority,
  });
  res.json({
    status:
      req.query.Status == "OK"
        ? _res.status == 100
          ? "Success"
          : "Failed!"
        : "Failed",
  });
});
function addMerchant(phoneNumber, Authority, amount) {
  app.locals.merchants[Authority] = { ph: phoneNumber, amount: amount };
}
function getMerchant(Authority) {
  return app.locals.merchants[Authority];
}
app.listen(3000);
