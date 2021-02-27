module.exports = {
    BotToken: "1658674092:AAET3_9ifGIfPrA1blELvv089C_fgchW8CE",
    ZarinpalMetaKey: "891a5bb8-7400-11e6-a5a7-000c295eb8fc",
    CallbackUrl: "https://localhost:3000/payResult",
    ZarinpalInfo: {Email: "a@gmail.com", PhoneNumber: "09100052611"},
    ExamTypes: () => {
        return [
            {examTypeId: 0, text: "Reading"},
            {examTypeId: 1, text: "Writing"},
            {examTypeId: 2, text: "Listening"},
            {examTypeId: 3, text: "Speaking"},
        ];
    },
    IELTSExamTypes: () => {
        return [
            {title: "IELTS Academic", IELTSExamTypeId: 0},
            {title: "IELTS General", IELTSExamTypeId: 1},
        ];
    },
    IELTSExamDetails: (examTypeId, IELTSExamTypeId, id) => {
        return {
            title: "موضوع محصول",
            description:
                "توضیحات محصول که بسیار طولانی می باشد و قرار است حوصله کاربر را به شدت به سر ببرد",
            price: "۱۲۴,۰۰۰,۰۰۰ تومان",
            amount: "124000000",
            payLink: `http://localhost:3000/pay?examType=${examTypeId}&ieltsExamType=${IELTSExamTypeId}&id=${id}`,
        };
    },
    backText: () => {
        return "بازگشت به منوی قبل";
    },
    buyProductButtonText: () => {
        return "خرید آزمون";
    },
    successBuy: (studentChatId, firstName, lastName) => {
        return 390552680;
    },
    checkRole: (chatId) => {
        if (chatId === 390552680)
            return 0;
        return 1;
    },
    getExamCounts: (chatId) => {
        return 1;
    },
    Roles: {Teacher: 0, Student: 1},
    getCourses: (studentChatId) => {
        return [{examId: 1, title: "IELTS Writing P1", teacherId: 390552680}];
    },
    getAllCourses: (teacherChatId) => {
        return [{examId: 128, title: "IELTS Writing P1", students: 1}, {
            examId: 256,
            title: "IELTS Writing P2",
            students: 0
        }];
    },
    getName: (chatId) => {
        return {name: "امیرحسین واحدی"}
    },
    sendMessageTo: (studentChatId, teacherChatId, text) => {
        return true;
    },
    getTeacherMessages: (studentChatId, examId) => {
        return ["سلام", "خوبی؟", "تا کجا پیش رفتی؟", "آنلاین شدی پیام بده!"];
    },
    getStudents: (teacherId, examId) => {
        return [{chatId: 380427926, FullName: "امیرحسین واحدی", examId: 256}];
    },
    getNewMessagesCount: (teacherChatId, examId) => {
        return 4;
    },
};
