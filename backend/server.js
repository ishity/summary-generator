// npm run devでサーバーを起動
const express = require('express'); // expressモジュールを読み込む
const app = express();              // express関数をappに格納
const PORT = 5000;                  // ポート番号を指定
const summarizeRoute = require("./routes/summarize"); // ルーティング設定を読み込む
const cors = require('cors');

// CORSヘッダーの設定
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// CORS設定を有効にする
app.use(cors({
    origin: true,credentials: true
}));

app.use(express.json());
app.use("/api/summarize", summarizeRoute);

// ルーティング設定をする
app.get("/", (req, res) => { // コールバック関数を設定
    res.send("Hello World");
});

// サーバーを起動
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
// app.listen(PORT, () => console.log("サーバーが起動しました"));

