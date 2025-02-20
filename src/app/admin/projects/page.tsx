import Projects from "@/components/Admin/Projects";
import React from "react";

const page = async () => {
  const allProjects = await fetch(`${process.env.BASE_URL}/admin/allProjects`, {
    cache: "no-store",
  });
  const projects = await allProjects.json();
  return (
    <div>
      {projects?.length > 0 ? (
        <Projects currentProjects={projects} />
      ) : (
        <h3 className="content-center text-center h-screen font-bold text-xl">
          Sorry, No Projects available..!!
        </h3>
      )}
    </div>
  );
};

export default page;
