import Header from "@/components/Header/Header";
import Projects from "@/components/Projects/Projects";

export default async function Home() {
  const allProjects = await fetch(`${process.env.BASE_URL}/projects`);
  const data = await allProjects.json();
  return (
    <>
      <Header />
      <Projects data={data} />
    </>
  );
}
