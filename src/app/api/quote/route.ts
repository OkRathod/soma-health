import { NextResponse } from 'next/server';

// Cache the quote for 24 hours so all users get the same one (mostly)
// or at least it doesn't spam the API on every refresh.
export const revalidate = 86400; 

export async function GET() {
  const apiKey = process.env.NINJA_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "API Key missing" }, { status: 500 });
  }

  try {
    // Fetch from API Ninjas
    const res = await fetch("https://api.api-ninjas.com/v1/quotes?category=success", {
      headers: { 'X-Api-Key': apiKey }
    });

    if (!res.ok) throw new Error("Failed to fetch quote");

    const data = await res.json();
    
    // The API returns an array, we just want the first item
    return NextResponse.json(data[0]);
    
  } catch (error) {
    return NextResponse.json({ 
      quote: "The only bad workout is the one that didn't happen.", 
      author: "Unknown" 
    }, { status: 200 }); // Fallback if API fails
  }
}