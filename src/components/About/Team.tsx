import React from "react";
import { ITeamInfo } from "../common/interface";

interface ITeamProps {
  teamInfo: ITeamInfo[];
}

const Team = ({ teamInfo }: ITeamProps) => {
  const teamMembers = [
    { name: "Victoria", role: "Creative Director", image: "/profile.jpg" },
    { name: "Sophia", role: "Designer", image: "/profile2.jpeg" },
    { name: "Emma", role: "Developer", image: "/image3.jpg" },
    { name: "Olivia", role: "Manager", image: "/image4.jpg" },
    { name: "Noah", role: "Photographer", image: "/image5.jpg" },
  ];

  return (
    <div className="bg-black text-white py-10">
      <h1 className="text-center text-4xl font-light mb-10">OUR TEAM</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 sm:px-8 lg:px-16">
        {teamInfo?.length > 0 &&
          teamInfo?.map((member, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-md shadow-lg"
            >
              {/* Image */}
              <img
                src={member.imageUrl}
                alt={member.name}
                height={300}
                className="w-full object-fit filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-bold">{member.name}</h2>
                <p className="text-sm">{member.designation}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Team;
