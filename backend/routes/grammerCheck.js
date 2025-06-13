require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const asyncWrap = require('../utils/asyncWrap');

router.post(
  '/',
  asyncWrap(async (req, res) => {
    try {
        const { text } = req.body;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a grammar correction tool. When given a sentence, respond ONLY with the corrected version. Do NOT explain, do NOT include any prefix or extra text. Just return the corrected sentence.'
          },
          {
            role: 'user',
            content: `${text}`
          }
        ],
        temperature: 0.3,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_APIKEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:8000',
          'X-Title': 'my-grammar-check-app'
        }
      }
    );

    const corrected = response.data.choices[0].message.content.trim();
    res.json({ corrected });
    console.log('Corrected sentence:', corrected);
    } catch (error) {
    console.error("Error in grammar route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
  })
);

module.exports = router;


module.exports = router