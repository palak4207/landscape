import EditTeamMember from "@/components/Admin/EditTeamMember";
import React from "react";

const page = async ({ searchParams }: any) => {
  const BASE_URL = process.env.BASE_URL;
  const { personName } = await searchParams;
  const team = await fetch(`${BASE_URL}/admin/team?name=${personName}`, {
    cache: "no-store",
  });
  const teamInfo = await team.json();

  return (
    <div>
      <EditTeamMember teamInfo={teamInfo?.[0]} />
    </div>
  );
};

export default page;
