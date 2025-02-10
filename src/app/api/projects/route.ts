import { NextRequest } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";

// Handle GET request
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams.get("name");
    const { db } = await connectToDatabase();
    if (!searchParams) {
      const items = await db.collection("projects").find({}).toArray();
      return new Response(JSON.stringify(items), { status: 200 });
    } else if (searchParams) {
      const items = await db
        .collection("projects")
        .find({ projectName: searchParams })
        .toArray();
      return new Response(JSON.stringify(items), {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from MongoDB" }),
      { status: 500 }
    );
  }
}
