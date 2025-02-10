import { NextRequest } from "next/server";
import { connectToDatabase } from "@/../lib/mongodb";
import { emailTriggred } from "./emailTriggred";

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { db } = await connectToDatabase();
    const collection = db.collection("feedbacks");
    const result = await collection.insertOne(data);

    await emailTriggred(data);
    return new Response(
      JSON.stringify({
        message: "Feedback submitted successfully",
        feedbackId: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
