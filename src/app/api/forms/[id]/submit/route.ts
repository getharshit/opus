import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await request.json();
    const formId = params.id;

    // Verify form exists
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      );
    }

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Create response record
    const response = await prisma.response.create({
      data: {
        formId,
        data,
        ipAddress: ip,
      },
    });

    return NextResponse.json({ 
      success: true, 
      responseId: response.id 
    });
  } catch (error) {
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}