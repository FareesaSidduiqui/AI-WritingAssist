require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const asyncWrap = require('../utils/asyncWrap');

router.post(
  '/',
  asyncWrap(async (req, res) => {
    const { text } = req.body;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that corrects spelling mistakes. Return only the corrected sentence.'
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
          'X-Title': 'my-spell-check-app'
        }
      }
    );

    const corrected = response.data.choices[0].message.content.trim();
    res.json({ corrected });
    console.log('Spelling-corrected text:', corrected);
  })
);

module.exports = router;
