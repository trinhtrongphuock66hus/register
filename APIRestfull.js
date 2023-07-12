const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // thêm middleware body-parser

app.use(cors()); // thêm cors middleware

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'users',
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối: ' + err.stack);
    return;
  }
  console.log('Kết nối thành công với id ' + connection.threadId);
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM nguoidung', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});
app.post('/users', (req, res) => {
  const { user, pass, email } = req.body;
  connection.query(`INSERT INTO nguoidung (user, pass, email) VALUES ('${user}', '${pass}', '${email}')`, (error, results, fields) => {
    if (error) throw error;
    console.log(`Thêm người dùng mới thành công: `, { user , pass, email });
    res.send({ message: 'Tạo tài khoản thành công' });
  });
});

app.get('/address', (req, res) => {
  connection.query('SELECT * FROM diachi', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});
app.post('/address', (req, res) => {
  const { name , address, phonenumber } = req.body;
  connection.query(`INSERT INTO diachi (name, address, phone) VALUES ('${name}', '${address}', '${phonenumber}')`, (error, results, fields) => {
    if (error) throw error;
    console.log(`Thêm địa chỉ mới thành công: `, { name , address, phonenumber });
    res.send({ message: 'Đặt hàng thành công' });
  });
});
//lấy địa chỉ ip
var os = require ('os');
var interfaces = os.networkInterfaces ();
var addresses = [];
for (var k in interfaces) {
  for (var k2 in interfaces [k]) {
    var address = interfaces [k] [k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push (address.address);
    }
  }
}
const host = '0.0.0.0'
app.listen(3000,host, () => {
  console.log(`Server đang chạy trên cổng http://${addresses}:3000/users`);
  console.log(`Server đang chạy trên cổng http://58.186.216.149:3000/users`);
});
