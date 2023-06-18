require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

// OpenAIのAPIエンドポイント
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

// OpenAIのAPIキー
const OPENAI_API_KEY = process.env.API_KEY;

// フロントエンドからのリクエストを受け付けるエンドポイント
router.post('/', async (req, res) => {
    const { text } = req.body;

    try {
        // OpenAIのAPIにリクエストを送信
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: 'text-davinci-003',
                prompt: text + ' 以上の文章を要約してください。',
                max_tokens: 60,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                }
            }
        );

        // レスポンスの本文から要約を取得
        const summary = response.data.choices[0].text.trim();

        // 要約をフロントエンドに返送
        res.json({ summary });

    } catch (err) {
        // エラーハンドリング
        console.log('エラーが発生しました。')
        console.error(err.response.data); // OpenAI APIからのエラーレスポンスをログに出力
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

module.exports = router;

