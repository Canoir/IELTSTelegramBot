const express = require("express");
const app = express();
const {MenuMiddleware} = require("telegraf-inline-menu");
const {Telegraf} = require("telegraf");
const CONSTANTS = require("./models/constants.js");
const {mainMenu} = require("./menus/mainMenu.js");
const {teacherCoursesMenu} = require("./menus/studentDashboard.js");
const {create} = require("./zarinpal/zarinpal.js");
//
app.locals.merchants = {};
app.locals.chatUsers = {};
//
const bot = new Telegraf(CONSTANTS.BotToken);
const middleStudent =
    new MenuMiddleware("/student/", teacherCoursesMenu(bot, app));
const middle = new MenuMiddleware("/", mainMenu(bot, app, middleStudent));
bot.use(middle.middleware());
bot.use(middleStudent.middleware());

// }
// const middleTeacher= (id) => {
//     return new MenuMiddleware("/", mainMenu(id, bot, app));
// }
bot.start((ctx) => {
    return middle.replyToContext(ctx);
});
//
bot.launch();
//Pay
app.get("/pay", async (req, res) => {
    const {examType, ieltsType, id} = req.query;
    if (examType && ieltsType && id) {
        const product = CONSTANTS.IELTSExamDetails(examType, ieltsType, id);
        const _res = await create(CONSTANTS.ZarinpalMetaKey, true).PaymentRequest({
            Amount: product.amount,
            CallbackURL: CONSTANTS.CallbackUrl,
            Description: product.description,
            Email: CONSTANTS.ZarinpalInfo.Email,
            Mobile: CONSTANTS.ZarinpalInfo.PhoneNumber,
        });
        if (_res.status == 100) {
            addMerchant(id, _res.authority, product.amount);
            res.redirect(_res.url);
        }
    } else {
        res.end();
    }
});
app.get("/payResult", async (req, res) => {
    const data = getMerchant(req.query.Authority);
    const zarinpal = create(CONSTANTS.ZarinpalMetaKey, true);
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
        id: data.id,
    });
});

function addMerchant(id, Authority, amount) {
    app.locals.merchants[Authority] = {id: id, amount: amount};
}

function getMerchant(Authority) {
    return app.locals.merchants[Authority];
}

app.listen(3000);
