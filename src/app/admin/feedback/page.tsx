import AdminFeedback from "@/components/Admin/Feedback";
import React from "react";

const page = async () => {
  const allFeedbacks = await fetch(`${process.env.BASE_URL}/admin/feedback`, {
    cache: "no-store",
  });
  const data = await allFeedbacks.json();
  return (
    <div>
      {data?.length > 0 ? (
        <AdminFeedback data={data} />
      ) : (
        <h3 className="content-center text-center h-screen font-bold text-xl">
          Sorry, No Feedbacks available..!!
        </h3>
      )}
    </div>
  );
};

export default page;
