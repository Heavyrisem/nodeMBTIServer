const express = require('express');
const crypto = require('crypto');

const { DB } = require('./DB');


const App = express();

//Middleware
App.use(express.json());
App.use((req, res, next) => {
    console.log("New Request");
    next();
})

App.post("/register", async (req, res) => {

    console.log("/register", req.body);
    const { ID, PW } = req.body;
    
    if (ID && PW) {
        const db = await DB.GetConnection();
        
        const index = await db.collection('Account').findOne({ID});
        if (!index) {
            // 회원가입 실행
            const Account = {ID, PW: crypto.createHash('sha512').update(PW).digest('base64')}
            const status = await db.collection('Account').insertOne(Account);

            if (status.acknowledged) return res.send("회원가입이 완료되었습니다.");
            else return res.send("가입에 실패했습니다.");

        } else return res.send("이미 가입된 아이디 입니다.");
    } else return res.send("입력값이 잘못되었습니다.");

})

App.post("/login", (req, res) => {
    console.log("/login", req.body);


    res.send("Hello world");
})

App.listen(80, () => {
    console.log("서버 온라인");
})
