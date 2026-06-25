const axios = require("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYW5hemFoZXJhNDVAZ21haWwuY29tIiwiZXhwIjoxNzgyMzc3OTA2LCJpYXQiOjE3ODIzNzcwMDYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIwNmUzYzk1YS1jZmZiLTRhNzUtODkxMi1iMTA3OGQ1MGM3MDYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzYW5hIHphaGVyYSIsInN1YiI6IjNmZmZkZDEzLTAzOGYtNGFkOC04YjZmLTBhZWFlOWNkNzZiMyJ9LCJlbWFpbCI6InNhbmF6YWhlcmE0NUBnbWFpbC5jb20iLCJuYW1lIjoic2FuYSB6YWhlcmEiLCJyb2xsTm8iOiIyM2IwMWE0NWEwIiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiM2ZmZmRkMTMtMDM4Zi00YWQ4LThiNmYtMGFlYWU5Y2Q3NmIzIiwiY2xpZW50U2VjcmV0IjoiWlhWWUZSYnRYUWVtdkJFYiJ9.9GvIPnsHXiayQT3_hBnv1IN-zELyuoojpqXNyo4yzIQ";

async function testLog() {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack: "backend",
        level: "info",
        package: "service",
        message: "Logger initialized successfully"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

testLog();