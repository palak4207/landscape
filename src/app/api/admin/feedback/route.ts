import { NextRequest } from "next/server";
import { connectToDatabase } from "@/../lib/mongodb";

// Handle GET request
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const items = await db.collection("feedbacks").find({}).toArray();
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
