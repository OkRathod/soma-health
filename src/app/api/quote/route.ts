import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const apiKey = process.env.NINJA_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "API Key missing" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.api-ninjas.com/v2/quotes?categories=success%2Cwisdom", {
      headers: { 'X-Api-Key': apiKey }
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    
    // FIX: Check if data exists and has items
    if (!data || data.length === 0) {
      throw new Error("No quotes found");
    }

    return NextResponse.json(data[0]);
    
  } catch (error) {
    console.error("Quote fetch error:", error); // Helpful for debugging logs
    return NextResponse.json({ 
      quote: "The only bad workout is the one that didn't happen.", 
      author: "Unknown" 
    }, { status: 200 });
  }
}