"use client";

import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { IProject } from "../common/interface";
import Image from "next/image";

interface IProjects {
  data: IProject;
  tags: [];
}

const Project = ({ data, tags }: IProjects) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTaggedImage, setSelectedTaggedImage] = useState<any>([]);

  const handleMarqueeClick = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    document
      .getElementById("carouselSection")
      ?.scrollIntoView({ behavior: "smooth" });
    data?.tags?.map((img) => {
      if (img?.tagName === selectedTag) {
        setSelectedTaggedImage(img?.images);
      }
    });
  }, [selectedTag]);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % selectedTaggedImage?.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedTaggedImage?.length) %
        selectedTaggedImage?.length
    );
  };

  const [loaded, setLoaded] = useState(false);

  // Trigger transition after the component mounts
  useEffect(() => {
    setLoaded(true); // This will trigger the transition after 1 second of mounting
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedTaggedImage.length]);

  return (
    <div className="relative w-full h-screen">
      <Header />
      {data && (
        <div className="relative w-full h-[calc(100vh-8rem)] overflow-hidden">
          <Image
            src={data?.bannerImage}
            alt={data?.bannerImage}
            className="w-full h-full object-cover"
          />

          {/* Project Specification */}
          <div
            className={`absolute top-0 right-0 w-[300px] h-full bg-opacity-50 bg-black p-6 flex flex-col items-center justify-center 
            ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
            transition-all duration-[2s] ease-in-out`}
          >
            {/* Project Name */}
            <h1 className="text-white text-3xl font-bold mb-6">
              {data?.projectName}
            </h1>

            {/* Project Specification Heading */}
            <h2 className="text-white text-xl font-semibold mb-4">
              Project Specification
            </h2>

            <div className="text-white">
              <p className="mb-2">
                <strong>Square:</strong> {data?.area}
              </p>
              <p className="mb-2">
                <strong>City:</strong> {data?.city}
              </p>
              <p className="mb-2">
                <strong>Year:</strong> {data?.year}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Infinite Marquee */}
      <div className="w-full bg-black text-white py-6 overflow-hidden text-center ">
        <div className="whitespace-nowrap flex items-center space-x-8 animate-infinite-marquee">
          {tags.map((room: string, idx: number) => (
            <div
              key={idx}
              className={`flex items-center px-4 text-sm md:text-base lg:text-xl font-semibold cursor-pointer hover:text-gray-400 transition-all duration-300 ${
                selectedTag === room ? "text-yellow-400 font-bold" : ""
              }`}
              onClick={() => handleMarqueeClick(room)}
            >
              {room}
            </div>
          ))}
        </div>
      </div>

      {selectedTag && (
        <div
          id="carouselSection"
          className="mt-8 px-4 py-6 bg-white w-full max-w-6xl mx-auto rounded-lg shadow-lg"
        >
          <div className="relative w-full h-[60vh] overflow-hidden rounded-lg shadow-lg">
            <div className="flex justify-center items-center h-full">
              <Image
                src={selectedTaggedImage[currentIndex]?.url}
                alt={selectedTaggedImage[currentIndex]?.url}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            </div>

            <div
              className={`absolute top-0 right-0 w-[300px] h-full bg-opacity-50 bg-black p-6 flex flex-col items-center justify-center 
            ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
            transition-all duration-[2s] ease-in-out`}
            >
              {/* Project Name */}
              <h1 className="text-white text-3xl font-bold mb-6">
                {selectedTag}
              </h1>

              {/* Project Specification Heading */}
              <h2 className="text-white text-xl font-semibold mb-4">
                Project Specification
              </h2>

              <div className="text-white">
                <p className="mb-2">
                  <strong>Area:</strong>{" "}
                  {selectedTaggedImage[currentIndex]?.area}
                </p>
                <p className="mb-2">
                  <strong>Material Used:</strong>{" "}
                  {selectedTaggedImage[currentIndex]?.materialUsed}
                </p>
              </div>
            </div>

            {/* Carousel Buttons */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black p-2 rounded-full cursor-pointer"
            >
              <span className="text-2xl">‹</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black p-2 rounded-full cursor-pointer"
            >
              <span className="text-2xl">›</span>
            </button>
          </div>
        </div>
      )}

      {/* Tailwind CSS Animation */}
      <style jsx>{`
        @keyframes infinite-marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-infinite-marquee {
          display: inline-flex;
          // animation: infinite-marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Project;
