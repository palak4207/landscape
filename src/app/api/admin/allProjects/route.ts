import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/../lib/mongodb";
import cors from "@/context/Middleware";
import { NextApiResponse } from "next";

// Handle GET request
export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    await cors(req, res);
    const { db } = await connectToDatabase();
    const items = await db.collection("projects").find({}).toArray();
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
