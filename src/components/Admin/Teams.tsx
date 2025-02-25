"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Teams = ({ teamInfo }: any) => {
  const [teams, setTeams] = useState(teamInfo);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const router = useRouter();
  const { isAdmin } = useAuth();

  const handleEdit = (name: string) => {
    router.push(`/admin/editTeam?personName=${name}`);
  };

  const handleDeleteConfirmation = (id: any) => {
    setSelectedMemberId(id);
    setIsDialogOpen(true);
  };

  // function to delete the team Member
  const handleDelete = async () => {
    if (!selectedMemberId) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/team`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedMemberId),
      }
    );
    const data = await response.json();
    if (data?.projectId) {
      // Fetch updated teams list after successful deletion
      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/team`
      );
      const updatedProjects = await updatedResponse.json();
      setTeams(updatedProjects); // Update teams list
      toast.success("Team Member Deleted successfully!");
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
            <th className="px-4 py-2 border-b"> Name</th>
            <th className="px-4 py-2 border-b">Designation</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams &&
            teams?.map((team: any) => (
              <tr key={team.id} className="hover:bg-gray-100 text-center">
                <td className="px-4 py-2 border-b">{team.name}</td>
                <td className="px-4 py-2 border-b">{team.designation}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleEdit(team.name)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(team._id)}
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
              Are you sure you want to delete this Team member?
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

export default Teams;
