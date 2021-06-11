const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
//const jwt = require('jsonwebtoken');
//const { authToken } = require('./middleware/token');
//const db = require('./db/connection');

const upload = multer({ dest: 'uploadedFiles/'});

const controllers = require("./controller");
const boardcontroller = require("./controller/boardcontroller")
const imagecontroller = require("./controller/imagecontroller")
const searchcontroller = require("./controller/searchcontroller")

require("./models");



const app = express();
app.use(express.json());
const port = 8080;

app.set('view engine', 'ejs');

app.use(
  cors({
    origin: true,
    credentials: true
  })
);


app.post("/user/login", controllers.logInController);
app.post("/user/signup", controllers.signUpController);
app.post("/user/signout", controllers.signOutController);

//app.post("/mypage/upload", boardcontroller.uploadController);
app.post("/mypage/deletecontent", boardcontroller.deleteController);
app.post("/mypage/upload", upload.array('photos') , imagecontroller.uploadImage);

app.get("/search", searchcontroller.searchController );
app.get("/showall", searchcontroller.showAllboard);
app.get("/board", searchcontroller.showOneboard);


app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});

//06.10 ec2 - rds 연결확인
//0611 파일 업로드 확인
//0611 검색기능 완료
//0611 전체 글 목록 시작
//0611 전체 글목록 , 글 하나 조회 완료