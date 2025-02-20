"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type FeedbackProps = {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
};

const Feedback = ({ setIsOpen, isOpen }: FeedbackProps) => {
  const route = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
    location: "",
  });

  // Updated errors type definition
  const [errors, setErrors] = useState<Record<string, string>>({
    name: "",
    phone: "",
    email: "",
  });

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Clear error when user starts typing in the respective field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error for the respective field
      }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validation function
  const validateForm = () => {
    let valid = true;
    const newErrors: Record<string, string> = {
      name: "",
      phone: "",
      email: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      valid = false;
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits.";
      valid = false;
    }

    // Email Validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // API call to post feedback
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    setFormData({ name: "", phone: "", email: "", comment: "", location: "" });
    if (data?.feedbackId) {
      toast.success("Feedback submitted successfully!");
    } else {
      toast.error("Something went wrong. Try again.");
    }
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="flex items-center cursor-pointer hover:text-black"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 md:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>

        <span
          className={`hidden sm:block font-normal text-[14px] text-[#3F3A3A] tracking-widest leading-[16px] font-sans pt-1 pr-6 ${
            route === "/contact" && "invert hover:text-blue-400"
          }`}
        >
          DROP REQUEST
        </span>
        <ToastContainer />
      </div>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
            route === "/contact" && "filter invert"
          }`}
          onClick={() => setIsOpen(false)}
        >
          {/* Dialog Box */}
          <div
            className={`bg-[#fafafa] text-black max-w-2xl p-8 m-4 rounded-lg relative ${
              route === "/contact" && "invert"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center text-2xl font-light mb-8 tracking-wide">
              MAKE REQUEST
            </h1>
            <form className="space-y-8 lg:space-y-12 ">
              <input
                type="text"
                name={"name"}
                value={formData?.name}
                onChange={(e) => onChangeHandler(e)}
                placeholder="Name"
                className="w-full bg-[#fafafa] text-black border-b border-gray-700 outline-none focus:border-orange-500 transition duration-300 placeholder-gray-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              <input
                type="number"
                name={"phone"}
                value={formData?.phone}
                onChange={(e) => onChangeHandler(e)}
                placeholder="Phone"
                className="w-full bg-[#fafafa] text-black border-b border-gray-700 outline-none focus:border-orange-500 transition duration-300 placeholder-gray-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}

              <input
                type="email"
                name={"email"}
                value={formData?.email}
                onChange={(e) => onChangeHandler(e)}
                placeholder="E-mail"
                className="w-full bg-[#fafafa] text-black border-b border-gray-700 outline-none focus:border-orange-500 transition duration-300 placeholder-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <input
                type="text"
                name={"location"}
                value={formData?.location}
                onChange={(e) => onChangeHandler(e)}
                placeholder="Location"
                className="w-full bg-[#fafafa] text-black border-b border-gray-700 outline-none focus:border-orange-500 transition duration-300 placeholder-gray-500"
                required={true}
              />
              <textarea
                placeholder="Your comment"
                name={"comment"}
                value={formData?.comment}
                onChange={(e) => onChangeHandler(e)}
                rows={3}
                className="w-full bg-[#fafafa] text-black border-b border-gray-700 outline-none focus:border-orange-500 transition duration-300 placeholder-gray-500 resize-none"
              ></textarea>
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="px-6 py-2 border-b border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
                >
                  SEND
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-5 text-gray-400 hover:text-orange-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
