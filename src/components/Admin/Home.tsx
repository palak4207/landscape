"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { isAdmin } = useAuth();

  // Check if user is an admin (Private Route)
  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-full md:w-3/5 lg:w-1/3 space-y-4  text-center ">
        <button
          type="button"
          className="w-full bg-blue-600  text-white py-3 px-6 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => router.push("/admin/project")}
        >
          Add Project
        </button>
        <button
          type="button"
          className="w-full bg-blue-600  text-white py-3 px-6 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => router.push("/admin/team")}
        >
          Add Team Member
        </button>
        <button
          type="button"
          className="w-full bg-blue-600  text-white py-3 px-6 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => router.push("/admin/feedback")}
        >
          Feedbacks
        </button>
        <button
          type="button"
          className="w-full bg-blue-600  text-white py-3 px-6 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => router.push("/admin/projects")}
        >
          Projects
        </button>
      </div>
    </div>
  );
};

export default Home;
