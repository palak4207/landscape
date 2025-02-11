"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const WorkStages = () => {
  const [progress, setProgress] = useState(0);
  const stages = [
    "PRESENTATION",
    "DESIGN CONTRACT",
    "SPACE LAYOUT",
    "VISUALIZATION",
    "DRAWINGS",
    "DESIGN CONCEPT",
    "SELECTION OF MATERIALS",
    "PROJECT CONTROL",
  ];

  // Update the progress dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 12.5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // TODO:To replace image with workStages image
  let image;
  if (progress >= 0 && progress < 20) {
    image = "/home.jpg";
  } else if (progress >= 20 && progress < 40) {
    image = "/path-to-image2.png";
  } else if (progress >= 40 && progress < 60) {
    image = "/home.jpg";
  } else if (progress >= 60 && progress < 80) {
    image = "/path-to-image4.png";
  } else {
    image = "/path-to-image5.png";
  }

  return (
    <div className="relative flex justify-center items-center w-full h-screen px-4">
      <div
        className="relative w-full max-w-md sm:max-w-lg lg:max-w-3xl"
        style={{ aspectRatio: "1" }}
      >
        <CircularProgressbar
          value={progress}
          strokeWidth={2}
          styles={{
            path: {
              stroke: "orange",
            },
            trail: {
              stroke: "#e6e6e6",
            },
          }}
        />
        <div
          className="absolute inset-0 w-[80%] h-[80%] mx-auto my-auto rounded-full"
          style={{
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            src={image}
            alt="Progress Image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        {stages.map((stage, index) => {
          const angle = index * 45;
          return (
            <div
              key={stage}
              className="absolute text-center text-xs sm:text-sm md:text-base "
              style={{
                top: "50%",
                left: "50%",
                transform: (() => {
                  if (window && window.innerWidth >= 1568) {
                    // Large screens (lg)
                    return `translate(-50%, -50%) rotate(${angle}deg) translateY(-24vw) rotate(-${angle}deg)`;
                  }
                  if (window && window.innerWidth >= 1024) {
                    // Large screens (lg)
                    return `translate(-50%, -50%) rotate(${angle}deg) translateY(-42vw) rotate(-${angle}deg)`;
                  } else if (window && window.innerWidth >= 768) {
                    // Medium screens (md)
                    return `translate(-50%, -50%) rotate(${angle}deg) translateY(-40vw) rotate(-${angle}deg)`;
                  } else {
                    // Small screens (sm)
                    return `translate(-50%, -50%) rotate(${angle}deg) translateY(-45vw) rotate(-${angle}deg)`;
                  }
                })(),
                transformOrigin: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-48%) translateY(-1vw)",
                }}
              >
                {stage}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkStages;
