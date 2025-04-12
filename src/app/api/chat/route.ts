import { NextResponse } from 'next/server';

if (!process.env.GROQ_API_KEY) {
  throw new Error('Missing Groq API key');
}

export async function POST(req: Request) {
  try {
    const { messages, model, temperature, maxTokens } = await req.json();

    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        messages,
        model: model || 'llama2-70b-4096',
        temperature: temperature || 0.7,
        max_tokens: maxTokens || 2048,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: 'Groq API request failed', details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      message: {
        role: 'assistant',
        content: data.choices[0].message.content,
      },
    });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
