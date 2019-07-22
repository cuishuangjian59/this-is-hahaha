const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require("cookie-parser");

app.use(express.static('./img'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//跨域
let cors = require('cors');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
//用户操作
const userSql = [
    {
        id: 0,
        user: '于海洋',
        pass: '1234',
        sex: '男',
        age: 19,
        type: 3,
        pic:'http://localhost/mouse.png'
    },
    {
        id: 1,
        user: '阿震',
        pass: "123",
        sex: '男',
        age: 2,
        type: 2,
        pic:'http://localhost/mouse.png'
    }
];
app.get('/list',(req,res)=>{
    res.json({
        code:0,
        msg:userSql
    })
})

app.use('/get', (req, res, next) => {
    let cookie = req.cookies.user;
    let obj = {};
    if (!cookie) {
        res.json({ code: 5, msg: '未登录' });
    } else {
        obj.code = 0;
        obj.msg = '登录成功';
        let u = userSql.find(item => item.user === cookie)
        obj.data = {
            user: u.user,
            pic: u.pic,
            type: u.type,
            sex: u.sex
        }
        res.json(obj);
    }
});

app.post('/login', (req, res) => {
    let obj = {};
    let { user, pass } = req.body;
    let u = userSql.find(item => item.user === user);
    if (u) {
        if (u.pass == pass) {
            obj.code = 0;
            obj.msg = '登录成功';
            obj.data = {
                user: u.user,
                pic: u.pic,
                type: u.type,
                sex: u.sex
            }
        } else {
            obj.code = 2;
            obj.msg = '用户名或密码错误';
        }
    } else {
        obj.code = 1;
        obj.msg = '用户不存在';
    }

    if (obj.code === 0) {
        res.cookie("user", obj.data.user, { maxAge: 100000 });
    }

    res.json(obj);

});









app.listen(80);
