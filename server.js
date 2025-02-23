import express from 'express';
import cors from 'cors';
import { generateClaudeResponse } from './src/api/claude.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/remix', async (req, res) => {
  console.log('API endpoint hit:', {
    method: req.method,
    body: req.body,
    headers: req.headers
  });

  try {
    const { text } = req.body;
    
    if (!text) {
      console.log('Missing text in request body');
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log('Calling Claude API with text:', text);
    const response = await generateClaudeResponse({
      prompt: text,
      maxTokens: 1000,
      temperature: 0.7
    });

    console.log('Claude API response:', response);

    if (!response || !response.content) {
      console.log('Invalid response from Claude:', response);
      return res.status(500).json({ error: 'Invalid response from Claude API' });
    }

    console.log('Sending successful response');
    return res.status(200).json({ remixedText: response.content });
  } catch (error) {
    console.error('Detailed API error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    return res.status(500).json({ 
      error: 'Error processing your request',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
}); 