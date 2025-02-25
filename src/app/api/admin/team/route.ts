import { NextRequest } from "next/server";
import { connectToDatabase } from "@/../lib/mongodb";
import { ObjectId } from "mongodb";

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

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams.get("name");
    const { db } = await connectToDatabase();
    if (!searchParams) {
      const items = await db.collection("teamMembers").find({}).toArray();
      return new Response(JSON.stringify(items), { status: 200 });
    } else if (searchParams) {
      const items = await db
        .collection("teamMembers")
        .find({ name: searchParams })
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

// Handle DELETE request
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const { db } = await connectToDatabase();
    const collection = db.collection("teamMembers");
    const result = await collection.deleteOne({ _id: new ObjectId(data) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Team Member not found" }),
        {
          status: 404,
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: "Member removed successfully",
        projectId: data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// Handle PUT request to update team Member info
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { db } = await connectToDatabase();
    const collection = db.collection("teamMembers");
    const { _id, ...newData } = data;
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: newData }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Team Member not found" }),
        {
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Information updated successfully",
        projectId: data?._id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
