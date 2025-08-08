import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Fetch all forms with response counts
    const forms = await prisma.form.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        _count: {
          select: {
            responses: true
          }
        }
      }
    });

    // Transform the data to include responseCount at the top level
    const formsWithResponseCount = forms.map(form => ({
      id: form.id,
      title: form.title,
      description: form.description,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
      responseCount: form._count.responses,
      theme: form.theme
    }));

    return NextResponse.json(formsWithResponseCount);
  } catch (error) {
    console.error('Forms fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forms' },
      { status: 500 }
    );
  }
}

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