import { NextRequest } from "next/server";
import { connectToDatabase } from "@/../lib/mongodb";
import { ObjectId } from "mongodb";

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { db } = await connectToDatabase();
    const collection = db.collection("projects");
    const result = await collection.insertOne(data);

    return new Response(
      JSON.stringify({
        message: "Project added successfully",
        projectId: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// Handle PUT request to update project details
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { db } = await connectToDatabase();
    const collection = db.collection("projects");
    const { _id, ...newData } = data;
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: newData }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Project updated successfully",
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

// Handle PUT request to update project details
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const { db } = await connectToDatabase();
    const collection = db.collection("projects");
    const result = await collection.deleteOne({ _id: new ObjectId(data) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({
        message: "Project deleted successfully",
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
