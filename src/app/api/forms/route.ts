import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { title, description, fields, theme, prompt } = await request.json();

    if (!title || !fields || !Array.isArray(fields)) {
      return NextResponse.json(
        { error: 'Title and fields are required' },
        { status: 400 }
      );
    }

    const form = await prisma.form.create({
      data: {
        title,
        description: description || '',
        fields,
        theme: theme || {},
        prompt: prompt || '',
      },
    });

    return NextResponse.json(form);
  } catch (error) {
    console.error('Form save error:', error);
    
    return NextResponse.json(
      { error: 'Failed to save form' },
      { status: 500 }
    );
  }
}