import { generateClaudeResponse } from '../../src/api/claude';

export default async function handler(req, res) {
  console.log('API endpoint hit:', {
    method: req.method,
    body: req.body,
    headers: req.headers
  });

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
} 