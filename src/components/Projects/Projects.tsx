"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IProject } from "../common/interface";

interface IProjects {
  data: IProject[];
}

const Projects = ({ data }: IProjects) => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="p-4 md:p-8 lg:p-16">
      <h1 className="text-center  text-2xl md:text-4xl tracking-widest">
        OUR PROJECTS
      </h1>
      <div className="text-center mb-6"></div>

      <div
        className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-6
      gap-4
     
    "
      >
        {data?.map((project: IProject, index: number) => {
          if (index < 8) {
            const spanClasses = (() => {
              // Logic for span classes
              if (index % 8 === 0 || index % 8 === 6)
                return "col-span-full md:col-span-4 row-span-2";
              if (
                index % 8 === 1 ||
                index % 8 === 2 ||
                index % 8 === 5 ||
                index % 8 === 7
              )
                return "col-span-full md:col-span-2 row-span-1";
              if (index % 8 === 3 || index % 8 === 4)
                return "col-span-full md:col-span-3 row-span-2";
              return "";
            })();

            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-lg shadow-lg ${spanClasses}`}
                onClick={() => router.push(`/${project.projectName}`)}
              >
                <img
                  src={project?.bannerImage}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  width={500}
                  height={300}
                />
                {/* Conditional Overlay */}
                <div className="absolute inset-0 bg-red-500 bg-opacity-75 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h2 className="text-white text-2xl font-bold">
                    {project.projectName || "Project Title"}
                  </h2>
                  <p className="text-white mt-2 text-sm">
                    {project.city || "City"} • {project.area || "Area"}sqft •{" "}
                    {project.year || "Year"}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {data?.length > 8 && !showMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowMore(true)}
            className="
              px-6 py-3 
              border-b border-orange-500 text-orange-500 rounded-lg 
              rounded-md  
              transition-all 
              font-medium
            "
          >
            View More
          </button>
        </div>
      )}

      {showMore && data?.length > 8 && (
        <div
          className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-4
          mt-4
        "
        >
          {data &&
            data?.map((project: IProject, index: number) => {
              if (index >= 8) {
                const spanClasses = (() => {
                  if (index % 8 === 0) return "col-span-1 row-span-2";
                  if (index % 8 === 4) return "col-span-1";
                  if (index % 8 === 6) return "col-span-1 row-span-2";
                  return "";
                })();

                return (
                  <div
                    key={index}
                    className={`relative group overflow-hidden rounded-lg shadow-lg ${spanClasses}`}
                    onClick={() => router.push(`/${project.projectName}`)}
                  >
                    <Image
                      src={project?.bannerImage}
                      alt={project.projectName || "Project Image"}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      width={500}
                      height={300}
                    />

                    {/* Conditional Overlay */}
                    <div className="absolute inset-0 bg-red-500 bg-opacity-75 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <h2 className="text-white text-2xl font-bold">
                        {project.projectName || "Project Title"}
                      </h2>
                      <p className="text-white mt-2 text-sm">
                        {project.city || "City"} • {project.area || "Area"}sqft
                        • {project.year || "Year"}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      )}
    </main>
  );
};

export default Projects;
