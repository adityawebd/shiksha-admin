"use client";
import dynamic from "next/dynamic";
// import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import Spinner from "../../comoponents/Spinner";
import Sidebar from "../../comoponents/Sidebar";

import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function page() {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function updateImagesOrder(images) {
    setImages(images);
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  console.log("img url is", images);

  function formDataToObject(formData) {
    const obj = {};
    formData.forEach((value, key) => {
      // Check if the key already exists in the object
      if (obj[key]) {
        // If it's an array, push the new value into the array
        if (Array.isArray(obj[key])) {
          obj[key].push(value);
        } else {
          // Convert to array if not already an array
          obj[key] = [obj[key], value];
        }
      } else {
        // Add the new key-value pair to the object
        obj[key] = value;
      }
    });
    return obj;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (images) {
      images.forEach((image, index) => {
        formData.append(`cardImage`, image); // Append each image file separately
      });
    }

    // Convert FormData to object and log it for debugging
    const formDataObject = formDataToObject(formData);
    console.log("FormData as Object:", formDataObject);

    try {
      const response = await axios.post("/api/blogs", formDataObject);
      console.log("Response:", response.data);
      window.location.replace("/blogs"); // Update the list of blogs
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"], // block elements
      ["link", "image", "video", "formula"], // media
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], // lists
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown sizes
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // custom header sizes
      [{ color: [] }, { background: [] }], // color and background
      [{ font: [] }], // font family
      [{ align: [] }], // text alignment
      ["clean"], // remove formatting button
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
    "formula",
    "header",
    "list",
    "bullet",
    "check",
    "script",
    "indent",
    "direction",
    "size",
    "color",
    "background",
    "font",
    "align",
    "clean",
  ];

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className=" w-10/12 ml-72 m-10 p-10">
          <div className="flex justify-center w-full">
            <h1 className="text-3xl font-bold ">New Blog</h1>
          </div>

          <form className="mt-28" onSubmit={handleSubmit}>
            <label>Card / Background Image</label>
            <div className="mb-2 flex flex-wrap gap-1">
              <ReactSortable
                list={images}
                className="flex flex-wrap gap-1"
                setList={updateImagesOrder}
              >
                {!!images?.length &&
                  images.map((link) => (
                    <div
                      key={link}
                      className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                    >
                      <img
                        src={link}
                        alt=""
                        className="rounded-lg"
                        height={100}
                        width={100}
                      />
                    </div>
                  ))}
              </ReactSortable>
              {isUploading && (
                <div className="h-24 flex items-center">
                  <Spinner />
                </div>
              )}
              <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div>Add image</div>
                <input type="file" onChange={uploadImages} className="hidden" />
              </label>
            </div>
            <div className="mt-4">
              <label> Title</label>
              <input
                placeholder="Enter title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-200 p-4 rounded-md shadow-sm w-full h-10"
              />
            </div>
            <div className="mt-4">
              <label>Content:</label>
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your blog content here..."
                className="border border-gray-200 p-4 rounded-md shadow-sm"
              />
            </div>

            <button
              className="bg-blue-600 text-white h-9 w-14 rounded mt-6"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
