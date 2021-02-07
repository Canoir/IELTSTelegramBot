module.exports = {
  BotToken: "1658674092:AAET3_9ifGIfPrA1blELvv089C_fgchW8CE",
  ZarinpalMetaKey: "891a5bb8-7400-11e6-a5a7-000c295eb8fc",
  CallbackUrl: "https://localhost:3000/payResult",
  ZarinpalInfo:{Email:"",PhoneNumber:""},
  ExamTypes: () => {
    return [
      { examTypeId: 0, text: "Reading" },
      { examTypeId: 1, text: "Writing" },
      { examTypeId: 2, text: "Listening" },
      { examTypeId: 3, text: "Speaking" },
    ];
  },
  IELTSExamTypes: () => {
    return [
      { title: "IELTS Academic", IELTSExamTypeId: 0 },
      { title: "IELTS General", IELTSExamTypeId: 1 },
    ];
  },
  IELTSExamDetails: (examTypeId, IELTSExamTypeId, phoneNumber) => {
    return {
      title: "موضوع محصول",
      description:
        "توضیحات محصول که بسیار طولانی می باشد و قرار است حوصله کاربر را به شدت به سر ببرد",
      price: "۱۲۴,۰۰۰,۰۰۰ تومان",
      amount: "124000000",
      payLink: `https://bitter-dragonfly-35.loca.lt/pay?examType=${examTypeId}&ieltsExamType=${IELTSExamTypeId}&phoneNumber=${phoneNumber}`,
    };
  },
  backText: () => {
    return "بازگشت به منوی قبل";
  },
  buyProductButtonText: () => {
    return "خرید آزمون";
  },
};