import { Anthropic } from '@anthropic-ai/sdk';

// Types for Claude API responses and requests
interface ClaudeResponse {
  content: string;
  role: 'assistant';
}

interface ClaudeRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export async function generateClaudeResponse(request: ClaudeRequest): Promise<ClaudeResponse> {
  const client = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  });

  try {
    const response = await client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: request.maxTokens || 1000,
      temperature: request.temperature || 0.7,
      system: "You are a helpful AI assistant.",
      messages: [
        {
          role: 'user',
          content: request.prompt,
        },
      ],
    });

    if (!response.content || response.content.length === 0) {
      throw new Error('Empty response from Claude API');
    }

    // Combine all text blocks from the response
    const fullContent = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    if (!fullContent) {
      throw new Error('No text content found in Claude API response');
    }

    return {
      content: fullContent,
      role: 'assistant',
    };
  } catch (error) {
    console.error('Error generating Claude response:', error);
    throw error;
  }
}

export type { ClaudeRequest, ClaudeResponse }; 