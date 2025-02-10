"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminFeedback = ({ data }: any) => {
  const router = useRouter();
  const { isAdmin } = useAuth();

  // to check private Route
  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin]);
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">User Feedback's</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b font-medium">Name</th>
                <th className="px-4 py-2 border-b font-medium">Phone No.</th>
                <th className="px-4 py-2 border-b font-medium">Email</th>
                <th className="px-4 py-2 border-b font-medium">Location</th>
                <th className="px-4 py-2 border-b font-medium">Comments</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 border-b">{item.name}</td>
                  <td className="px-4 py-4 border-b">{item.phone}</td>
                  <td className="px-4 py-4 border-b">{item.email}</td>
                  <td className="px-4 py-4 border-b">{item.location}</td>
                  <td className="px-4 py-4 border-b">{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminFeedback;
