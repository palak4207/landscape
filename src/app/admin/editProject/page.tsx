import EditProjectForm from "@/components/Admin/EditProjectForm";
import React from "react";

const page = async ({ searchParams }: any) => {
  const BASE_URL = process.env.BASE_URL;
  const { projectName } = await searchParams;
  const project = await fetch(`${BASE_URL}/projects?name=${projectName}`);
  const projectDetails = await project.json();

  return (
    <div>
      <EditProjectForm projectDetails={projectDetails?.[0]} />
    </div>
  );
};

export default page;
