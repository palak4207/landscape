"use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import WorkStages from "./WorkStages";
// import Header from "../Header/Header";
// import Team from "./Team";
// import { ITeamInfo } from "../common/interface";

// interface IAboutProps {
//   teamInfo: ITeamInfo[];
// }

// const About = ({ teamInfo }: IAboutProps) => {
//   return (
//     <>
//       <Header />
//       <div className="flex flex-col items-center justify-center lg:min-h-screen px-2">
//         <h1 className="text-2xl md:text-4xl text-center mb-6">
//           HOME IS YOUR PERFECT UNIVERSE
//         </h1>

//         <p className="text-lg md:text-xl text-center max-w-3xl mb-10">
//           Discover our exclusive collection of stunning images, showcasing the
//           beauty and creativity of our work.
//         </p>

//         <div className="w-full max-w-7xl">
//           <Swiper
//             modules={[Navigation, Pagination]}
//             navigation
//             pagination={{ clickable: true }}
//             spaceBetween={30}
//             slidesPerView={1}
//             loop={true}
//           >
//             {/* TODO:Replace static image with the actuall images of office  */}
//             {[
//               "/home.jpg",
//               "https://via.placeholder.com/800x400?text=Slide+2",
//               "https://via.placeholder.com/800x400?text=Slide+3",
//               "https://via.placeholder.com/800x400?text=Slide+4",
//             ].map((image, index) => (
//               <SwiperSlide key={index}>
//                 <div className="flex justify-center items-center">
//                   <img
//                     src={image}
//                     alt={`Slide ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//       <WorkStages />
//       <Team teamInfo={teamInfo} />
//     </>
//   );
// };

// export default About;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import WorkStages from "./WorkStages";
import Header from "../Header/Header";
import Team from "./Team";
import { ITeamInfo } from "../common/interface";

interface IAboutProps {
  teamInfo: ITeamInfo[];
}

const About = ({ teamInfo }: IAboutProps) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center lg:min-h-screen px-2">
        <h1 className="text-2xl md:text-4xl text-center mb-6">
          HOME IS YOUR PERFECT UNIVERSE
        </h1>

        <p className="text-lg md:text-xl text-center max-w-3xl mb-10">
          Discover our exclusive collection of stunning images, showcasing the
          beauty and creativity of our work.
        </p>

        <div className="w-full max-w-7xl">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
          >
            {[
              "/home.jpg",
              "https://via.placeholder.com/800x400?text=Slide+2",
              "https://via.placeholder.com/800x400?text=Slide+3",
              "https://via.placeholder.com/800x400?text=Slide+4",
            ].map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center w-full h-[400px] md:h-[600px]">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <WorkStages />
      <Team teamInfo={teamInfo} />
    </>
  );
};

export default About;
