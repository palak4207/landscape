// import { connectToDatabase } from "@/../lib/mongodb";

// // Handle GET request
// export async function GET(req: Request) {
//   try {
//     const { db } = await connectToDatabase();
//     const items = await db
//       .collection("projects")
//       .find({ projectName: req.body })
//       .toArray();
//     return new Response(JSON.stringify(items), {
//       status: 200,
//       headers: {
//         "Cache-Control": "no-store",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//     });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: "Internal Server Error..!!" }),
//       { status: 500 }
//     );
//   }
// }
