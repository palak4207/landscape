import { NextRequest } from "next/server";
import { connectToDatabase } from "@/../lib/mongodb";

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { db } = await connectToDatabase();
    const collection = db.collection("teamMembers");
    const result = await collection.insertOne(data);

    return new Response(
      JSON.stringify({
        message: "Team Member added successfully",
        projectId: result.insertedId,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
