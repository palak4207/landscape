import AdminFeedback from "@/components/Admin/Feedback";
import React from "react";

const page = async () => {
  const allFeedbacks = await fetch(`${process.env.BASE_URL}/admin/feedback`);
  const data = await allFeedbacks.json();
  return <div>{data?.length > 0 && <AdminFeedback data={data} />}</div>;
};

export default page;
