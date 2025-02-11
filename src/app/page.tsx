import Projects from "@/components/Projects/Projects";

export default async function Home() {
  const allProjects = await fetch(`${process.env.BASE_URL}/projects`);
  // const data = await allProjects.json();
  // console.log("data", data);
  // return (
  //   <>
  //     <Header />
  //     {data?.length > 0 && <Projects data={data} />}
  //   </>
  // );

  try {
    const data = await allProjects.json();
    return <div>{data?.length > 0 && <Projects data={data} />}</div>;
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return <div>Error parsing data</div>; // Show an error message
  }
}
