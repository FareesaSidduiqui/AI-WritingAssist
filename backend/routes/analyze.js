require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const asyncWrap = require('../utils/asyncWrap')

router.post('/', asyncWrap( async (req, res) => {
  const { sentence } = req.body;

  const rephrasedOptions = [];

  try {
    for (let i = 0; i < 3; i++) {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'mistralai/mistral-7b-instruct',  // ✅ FREE model
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that rephrases sentences. Return only the rephrased sentence.'
            },
            {
              role: 'user',
              content: `Rephrase this sentence: ${sentence}`
            }
          ],
          temperature: 0.7,
          max_tokens: 100
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:8000',
            'X-Title': 'my-rephraser-app'
          }
        }
      );

      const reply = response.data.choices[0].message.content.trim();
      rephrasedOptions.push(reply);
    }

    res.json({ rephrased: rephrasedOptions });
    console.log('Rephrased variations:', rephrasedOptions);

  } catch (error) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to get rephrased sentence.',
      details: error.response?.data || error.message
    });
  }
}));

module.exports = router;
