import About from "@/components/About/About";
import { ITeamInfo } from "@/components/common/interface";
import React from "react";

const page = async () => {
  const data = await fetch(`${process.env.BASE_URL}/team`, {
    cache: "no-store",
  });
  const teamInfo: ITeamInfo[] = await data.json();
  return <div>{teamInfo?.length > 0 && <About teamInfo={teamInfo} />}</div>;
};

export default page;
