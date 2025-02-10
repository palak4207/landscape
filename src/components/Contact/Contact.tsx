import React from "react";
import Header from "../Header/Header";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <div className="relative w-full lg:h-screen bg-black text-white overflow-hidden">
        <Header />
        <div className="mt-24 inset-0 flex flex-col lg:flex-row justify-between items-center px-6 md:px-16">
          <div className="flex flex-col space-y-8 w-full lg:w-1/3">
            <h1 className="text-4xl md:text-6xl font-light tracking-wide">
              CONTACT
            </h1>
            <div>
              <h2 className="text-md font-medium">WRITE TO US</h2>
              <Link
                href="mailto:architectureslandscape@gmail.com"
                className="mt-2 text-sm"
              >
                architectureslandscape@gmail.com
              </Link>
            </div>
            <div>
              <h2 className="text-md font-medium">CALL US</h2>
              <p className="mt-2 text-sm">
                +91-7024740111 <br /> +91-7400768989
              </p>
            </div>
          </div>

          <div className="relative w-full h-[300px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden border border-gray-700 mt-6 lg:mt-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6471.386157975174!2d75.06516004388904!3d24.07670456916714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39642d4e43b0ef4f%3A0x749f67563171622c!2sLandscape%20Architects!5e0!3m2!1sen!2sin!4v1734865623627!5m2!1sen!2sin&maptype=roadmap&disableDefaultUI=true"
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
              style={{
                filter: "brightness(0.3) contrast(1.2)",
                pointerEvents: "none",
              }}
            ></iframe>
            <a
              href="https://maps.app.goo.gl/Hyiow1cGzHGm1Qvn8"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label="Open larger map in a new window"
            ></a>
          </div>

          <div className="flex flex-col space-y-9 w-full lg:w-1/4 mt-6 lg:mt-0">
            <div className="flex flex-col items-start">
              <h2 className="text-md font-medium">WORKING HOURS</h2>
              <p className="mt-2 text-sm">MON–FRI: 9:00 to 19:00</p>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-md font-medium">SOCIAL NETWORKS</h2>
              <div className="mt-2 space-x-4 text-sm">
                <Link
                  href="https://www.facebook.com/Architectureslandscape?rdid=Z3LFozy1pizDxUQL&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18k2ydYz2u%2F#"
                  className="hover:underline"
                  target="blank"
                >
                  Facebook
                </Link>
                <Link
                  href="https://www.instagram.com/landscape_archist?igsh=eWo5dHNpdmd0cnY="
                  className="hover:underline"
                  target="blank"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <footer className="absolute bottom-4 w-full text-center text-xs">
          <p>© 2019. All rights reserved.</p>
        </footer> */}
      </div>
    </>
  );
};

export default Contact;
