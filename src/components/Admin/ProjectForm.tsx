"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const ProjectForm = () => {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    bannerImage: "",
    tags: [
      {
        tagName: "",
        images: [
          {
            url: "",
            materialUsed: "",
            area: "",
          },
        ],
      },
    ],
    city: "",
    area: "",
    year: "",
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tagIndex: number,
    imageIndex: number,
    field: string
  ) => {
    const value = e.target.value;
    const updatedTags = [...formData.tags];

    if (field === "tagName") {
      updatedTags[tagIndex].tagName = value;
      setFormData({
        ...formData,
        tags: updatedTags,
      });
    } else if (field === "images") {
      updatedTags[tagIndex].images[imageIndex].url = value;
      setFormData({
        ...formData,
        tags: updatedTags,
      });
    } else if (field === "materialUsed") {
      updatedTags[tagIndex].images[imageIndex].materialUsed = value;
      setFormData({
        ...formData,
        tags: updatedTags,
      });
    } else if (field === "imageArea") {
      updatedTags[tagIndex].images[imageIndex].area = value;
      setFormData({
        ...formData,
        tags: updatedTags,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleAddTagImage = (tagIndex: number) => {
    const updatedTags = [...formData.tags];
    updatedTags[tagIndex].images.push({
      url: "",
      materialUsed: "",
      area: "",
    });
    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  const handleAddTag = () => {
    setFormData({
      ...formData,
      tags: [
        ...formData.tags,
        {
          tagName: "",
          images: [
            {
              url: "",
              materialUsed: "",
              area: "",
            },
          ],
        },
      ],
    });
  };

  // Function to handle image deletion
  const handleDeleteImage = (tagIndex: number, imageIndex: number) => {
    const updatedTags = [...formData.tags];
    if (updatedTags?.[tagIndex]?.images?.length > 1) {
      updatedTags[tagIndex].images.splice(imageIndex, 1); // Remove image at the specified index
      setFormData({
        ...formData,
        tags: updatedTags,
      });
    } else {
      toast.error("Need to have atleast one image");
    }
  };

  const handleDeleteTag = (tagIndex: number) => {
    const updatedTags = [...formData.tags];
    if (updatedTags?.length > 1) {
      updatedTags.splice(tagIndex, 1); // Remove tag at the specified index
      setFormData({
        ...formData,
        tags: updatedTags,
      });
    } else {
      toast.error("Need to have atleast one tag");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    setFormData({
      projectName: "",
      clientName: "",
      bannerImage: "",
      tags: [
        {
          tagName: "",
          images: [
            {
              url: "",
              materialUsed: "",
              area: "",
            },
          ],
        },
      ],
      city: "",
      area: "",
      year: "",
    });
    if (data?.projectId) {
      toast.success("Project Details submitted successfully!");
    } else {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Project Details Form
        </h2>

        <div>
          <label
            htmlFor="projectName"
            className="block text-lg font-medium text-gray-700"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={formData.projectName}
            onChange={(e) => handleChange(e, 0, 0, "projectName")}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="clientName"
            className="block text-lg font-medium text-gray-700"
          >
            Client Name
          </label>
          <input
            type="text"
            id="clientName"
            value={formData.clientName}
            onChange={(e) => handleChange(e, 0, 0, "clientName")}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="bannerImage"
            className="block text-lg font-medium text-gray-700"
          >
            Banner Image URL
          </label>
          <input
            type="url"
            id="bannerImage"
            value={formData.bannerImage}
            onChange={(e) => handleChange(e, 0, 0, "bannerImage")}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          {formData.tags.map((tag, tagIndex) => (
            <div
              key={tagIndex}
              className="space-y-4  border border-orange-600 p-4 mb-8"
            >
              <div className="flex justify-between">
                <label
                  htmlFor={`tagName-${tagIndex}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Tag Name (e.g., Living Room)
                </label>

                <button
                  type="button"
                  onClick={() => handleDeleteTag(tagIndex)}
                  className="text-red-600 hover:text-red-800 text-lg font-medium"
                >
                  ❌ Delete Tag
                </button>
              </div>

              <input
                type="text"
                id={`tagName-${tagIndex}`}
                value={tag.tagName}
                onChange={(e) => handleChange(e, tagIndex, 0, "tagName")}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />

              {tag.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="space-y-4 border border-black p-4"
                >
                  <div>
                    <label
                      htmlFor={`imageUrl-${tagIndex}-${imageIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image URL
                    </label>
                    <input
                      type="url"
                      id={`imageUrl-${tagIndex}-${imageIndex}`}
                      value={image.url}
                      onChange={(e) =>
                        handleChange(e, tagIndex, imageIndex, "images")
                      }
                      className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`materialUsed-${tagIndex}-${imageIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Material Used
                    </label>
                    <input
                      type="text"
                      id={`materialUsed-${tagIndex}-${imageIndex}`}
                      value={image.materialUsed}
                      onChange={(e) =>
                        handleChange(e, tagIndex, imageIndex, "materialUsed")
                      }
                      className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`area-${tagIndex}-${imageIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Area
                    </label>
                    <input
                      type="text"
                      id={`area-${tagIndex}-${imageIndex}`}
                      value={image.area}
                      onChange={(e) =>
                        handleChange(e, tagIndex, imageIndex, "imageArea")
                      }
                      className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  {/* Delete Icon */}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(tagIndex, imageIndex)}
                    className="text-red-600 hover:text-red-800 text-lg font-medium"
                  >
                    ❌ Delete Image
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddTagImage(tagIndex)}
                className="text-blue-600 hover:text-blue-800 text-lg font-medium"
              >
                + Add Image
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddTag}
            className="text-blue-600 hover:text-blue-800 text-lg font-medium mt-4"
          >
            + Add New Tag
          </button>
        </div>

        <div>
          {" "}
          <label
            htmlFor="city"
            className="block text-lg font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => handleChange(e, 0, 0, "city")}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="area"
            className="block text-lg font-medium text-gray-700"
          >
            Area
          </label>
          <input
            type="text"
            id="area"
            value={formData.area}
            onChange={(e) => handleChange(e, 0, 0, "area")}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-lg font-medium text-gray-700"
          >
            Year
          </label>
          <input
            type="number"
            id="year"
            value={formData.year}
            onChange={(e) => handleChange(e, 0, 0, "year")}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
