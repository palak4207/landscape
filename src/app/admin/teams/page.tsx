import Teams from "@/components/Admin/Teams";
import React from "react";

const page = async () => {
  const allTeams = await fetch(`${process.env.BASE_URL}/admin/team`, {
    cache: "no-store",
  });
  const teams = await allTeams.json();
  return (
    <div>
      {teams?.length > 0 ? (
        <Teams teamInfo={teams} />
      ) : (
        <h3 className="content-center text-center h-screen font-bold text-xl">
          Sorry, No Teams available..!!
        </h3>
      )}
    </div>
  );
};

export default page;
