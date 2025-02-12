import { IProjectImage } from "@/components/common/interface";
import Project from "@/components/Projects/Project";
import React from "react";

interface IParams {
  params: {
    slugs: string;
  };
}

const page = async ({ params }: any) => {
  const BASE_URL = process.env.BASE_URL;
  const projectName = await params;
  const project = await fetch(`${BASE_URL}/projects?name=${projectName.slugs}`);
  const data = await project.json();
  let tags = [];

  if (data?.length > 0) {
    tags = data?.[0]?.tags?.map((tag: any) => tag.tagName).flat();
  }
  return (
    <div>
      <Project data={data?.[0]} tags={tags} />
    </div>
  );
};

export default page;
