// test.js (ESM 写法)
import http from "http";

const postData = JSON.stringify({
  username: "your_username",
  password: "your_password",
  code: "1234",
  randomStr: "abcd1234"
});

const options = {
  hostname: "47.116.170.1",
  port: 80,
  path: "/admin/login",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData)
  }
};

const req = http.request(options, res => {
  console.log(`状态码: ${res.statusCode}`);

  res.setEncoding("utf8");
  res.on("data", chunk => {
    console.log("响应数据:", chunk);
  });
});

req.on("error", e => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 写入数据并结束请求
req.write(postData);
req.end();
