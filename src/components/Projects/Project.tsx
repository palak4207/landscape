"use client";

import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { IProject } from "../common/interface";

interface IProjects {
  data: IProject;
  tags: string[];
}

const Project = ({ data, tags }: IProjects) => {
  const [selectedTag, setSelectedTag] = useState<string>(tags[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTaggedImage, setSelectedTaggedImage] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMarqueeClick = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (selectedTag && selectedTaggedImage) {
      document
        .getElementById("carouselSection")
        ?.scrollIntoView({ behavior: "smooth" });
      data?.tags?.map((img) => {
        if (img?.tagName === selectedTag) {
          setSelectedTaggedImage(img?.images);
        }
      });
    }
  }, [selectedTag, selectedTaggedImage]);

  const handleNext = () => {
    if (selectedTaggedImage?.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % selectedTaggedImage?.length
      );
    }
  };

  const handlePrev = () => {
    if (selectedTaggedImage?.length > 0) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedTaggedImage?.length) %
          selectedTaggedImage?.length
      );
    }
  };

  // Trigger transition after the component mounts
  useEffect(() => {
    setLoaded(true); // This will trigger the transition after 1 second of mounting
  }, []);

  useEffect(() => {
    if (selectedTag) {
      const intervalId = setInterval(() => {
        handleNext();
      }, 15000);

      return () => clearInterval(intervalId);
    }
  }, [selectedTaggedImage.length]);

  const formatMaterialUsed = (materialUsed: string) => {
    return materialUsed
      ?.split(",")
      .map((item, index) => <div key={index}>{item.trim()}</div>);
  };

  return (
    <div className="relative w-full h-screen">
      <Header />
      {data && (
        <div className="relative w-full overflow-hidden">
          <img
            src={data?.bannerImage}
            alt={data?.bannerImage}
            width={400}
            height={400}
            className="w-full h-full object-fill"
          />

          {/* Project Specification */}
          <div
            className={`absolute top-0 max-sm:hidden right-0 w-[300px] h-full bg-opacity-50 bg-black p-6 flex flex-col items-center justify-center
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
                <strong>Total Area:</strong> {data?.area}sqft
              </p>
              <p className="mb-2">
                <strong>City:</strong> {data?.city}
              </p>
              <p className="mb-2">
                <strong>Year:</strong> {data?.year}
              </p>
            </div>
          </div>

          <div className="md:hidden absolute bottom-0 left-0 w-full bg-opacity-50 bg-black p-6 text-white font-bold text-center">
            {" "}
            {data?.city} • {data?.area}sqft • {data?.year}
          </div>
        </div>
      )}

      {/* Infinite Marquee */}
      <div className="w-full bg-black text-white py-6 overflow-scroll text-center ">
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

      {selectedTag &&
        selectedTag?.toLowerCase() !== "elevation" &&
        selectedTaggedImage && (
          <div
            className="my-8 px-4 py-6 w-full max-w-6xl mx-auto rounded-lg shadow-lg"
            id="carouselSection"
          >
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
              {!imageLoaded && (
                <p className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Loading...
                </p>
              )}

              <div className="flex justify-center items-center h-full">
                {selectedTaggedImage[currentIndex]?.url ? (
                  <img
                    src={selectedTaggedImage[currentIndex]?.url}
                    alt={`${selectedTag} image`}
                    width={400}
                    height={400}
                    onLoad={() => setImageLoaded(true)}
                    className="w-full h-full object-fill transition-all duration-500 ease-in-out"
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>

              <div
                className={`absolute max-sm:hidden top-0 right-0 w-1/3 md:w-[300px] h-full bg-opacity-50 bg-black p-6 flex flex-col items-center justify-center
            ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
            transition-all duration-[2s] ease-in-out`}
              >
                <h1 className="text-white text-3xl font-bold mb-6">
                  {selectedTag}
                </h1>

                <h2 className="text-white text-xl font-semibold mb-4 ">
                  Project Specification
                </h2>

                <div className="text-white">
                  <p className="mb-2">
                    <strong>Size:</strong>{" "}
                    {selectedTaggedImage[currentIndex]?.area}
                  </p>
                  <p className="mb-2">
                    <strong>Material Used:</strong>{" "}
                    <div>
                      {formatMaterialUsed(
                        selectedTaggedImage[currentIndex]?.materialUsed
                      )}
                    </div>
                    {/* {selectedTaggedImage[currentIndex]?.materialUsed} */}
                  </p>
                </div>
              </div>

              <div className="md:hidden absolute bottom-0 left-0 w-full bg-opacity-50 bg-black p-6 text-white font-bold text-center">
                {" "}
                {selectedTag} • {selectedTaggedImage[currentIndex]?.area} •{" "}
                {selectedTaggedImage[currentIndex]?.materialUsed}
              </div>

              {selectedTaggedImage?.length > 1 && (
                <>
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
                </>
              )}
            </div>
          </div>
        )}

      {selectedTag &&
        selectedTag?.toLowerCase() === "elevation" &&
        selectedTaggedImage && (
          <div
            className="my-8 pt-4 pb-4 bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            id="carouselSection"
          >
            <div className="relative w-full  overflow-hidden rounded-lg shadow-lg">
              <div className="flex justify-center items-center h-full">
                {selectedTaggedImage[currentIndex]?.url ? (
                  <img
                    src={selectedTaggedImage[currentIndex]?.url}
                    alt={`${selectedTag} image`}
                    width={400}
                    height={400}
                    className="w-full h-full object-contain transition-all duration-500 ease-in-out"
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>

              <div
                className={`absolute max-sm:hidden top-0 right-0 w-1/3 md:w-[300px] h-full bg-opacity-50 bg-black p-6 flex flex-col items-center justify-center
            ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
            transition-all duration-[2s] ease-in-out`}
              >
                {/* Project Name */}
                <h1 className="text-white text-3xl font-bold mb-6">
                  {selectedTag}
                </h1>

                {/* Project Specification Heading */}
                <h2 className="text-white text-xl font-semibold mb-4 ">
                  Project Specification
                </h2>

                <div className="text-white">
                  <p className="mb-2">
                    <strong>Size:</strong>{" "}
                    {selectedTaggedImage[currentIndex]?.area}
                  </p>
                  <p className="mb-2">
                    <strong>Material Used:</strong>{" "}
                    {selectedTaggedImage[currentIndex]?.materialUsed}
                  </p>
                </div>
              </div>

              <div className="md:hidden absolute bottom-0 left-0 w-full bg-opacity-50 bg-black p-6 text-white font-bold text-center">
                {" "}
                {selectedTag} • {selectedTaggedImage[currentIndex]?.area} •{" "}
                {selectedTaggedImage[currentIndex]?.materialUsed}
              </div>

              {/* Carousel Buttons */}
              {selectedTaggedImage?.length > 1 && (
                <>
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
                </>
              )}
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
