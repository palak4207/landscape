"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Projects = ({ currentProjects }: any) => {
  const [projects, setProjects] = useState(currentProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const router = useRouter();
  const { isAdmin } = useAuth();

  const handleEdit = (projectName: string) => {
    router.push(`/admin/editProject?projectName=${projectName}`);
  };

  const handleDeleteConfirmation = (id: any) => {
    setSelectedProjectId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedProjectId) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/project`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProjectId),
      }
    );
    const data = await response.json();
    if (data?.projectId) {
      // Fetch updated projects list after successful deletion
      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/allProjects`
      );
      const updatedProjects = await updatedResponse.json();
      setProjects(updatedProjects); // Update projects list
      toast.success("Project Deleted successfully!");
    } else {
      toast.error("Something went wrong. Try again.");
    }

    setIsDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin]);

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Project Name</th>
            <th className="px-4 py-2 border-b">Client Name</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects?.map((project: any) => (
              <tr key={project.id} className="hover:bg-gray-100 text-center">
                <td className="px-4 py-2 border-b">{project.projectName}</td>
                <td className="px-4 py-2 border-b">{project.clientName}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleEdit(project.projectName)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(project._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this project?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
