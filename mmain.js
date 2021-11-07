var express = require('express');
var DB = require('./DB');

var App = express();

App.use(express.json());

App.post('/savembti', async (req, res) => {
    console.log("/savembti로 요청이 왔습니다.", req.body);
    
    if (req.body.ID && req.body.MbtiTYPE) {
        
        var db = await DB.GetConnection();

        var findUser = await db.collection('Account').findOne({ID: req.body.ID});

        if (findUser != undefined) {

            await db.collection('Account').updateOne({ID: req.body.ID}, { $set: { mbti: req.body.MbtiTYPE } });
            res.send({status: 1, msg: "저장이 완료되었습니다."});

        } else res.send({status: 0, msg: "없는 사용자 입니다."});
        
        

    } else res.send({status: 0, msg: "필수 입력값이 비었습니다."});
})




App.listen(80, () => {
    console.log("서버가 온라인입니다.");
})

// http://IP/savembti 

// 142.250.196.142:80

// http -> 80
// ftp 22
// ssh 21
// smb ~
// https 443


// google.com

// naver.com/search