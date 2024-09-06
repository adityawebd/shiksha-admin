import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { CircleUserRound, User } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditBlog() {
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

  const [blogInfo, setBlogInfo] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState("");
  const [url, setUrl] = useState("");
  // const navigate = useNavigate();
  const router = useRouter();

  const { title } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/blogs?title=" + title);
      const result = await res.json();
      if (result.success) {
        setBlogTitle(result.data?.title);
        setContent(result.data?.content);
        setMeta(result.data?.meta);
        setUrl(result.data?.url);
      }
    };

    fetchData();
  }, [title]);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    const router = useRouter();
    const blogData = {
      title,
      content,
      meta,
      url,
    };

    console.log(blogData);

    try {
        if (title) {
          // Update the blog if title exists
          await axios.put(`/api/blogs/${title}`, blogData);
          console.log("Blog updated successfully");
          window.location.replace("/blogs");
        } else {
          // Create a new blog
          await axios.post("/api/blogs", blogData);
          console.log("Blog created successfully");
        }
    
        // Navigate to /blogs after a successful request
        router.push("/blogs");
      } catch (error) {
        console.error("There was an error submitting the blog!", error);
      }
    
  };

  return (
    <div className="bg-white h-full p-4">
      <h1 className="h-1 mb-10  font-bold text-3xl">{"Edit Blog"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Meta tags</label>
          <textarea
            placeholder="Enter meta tags with html code"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            className="border border-gray-200 p-4 rounded-md shadow-sm w-full"
            rows="2"
          ></textarea>
        </div>

        <div>
          <label> Your URL </label>
          <input
            placeholder="Enter your custom url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-gray-200 p-4 rounded-md shadow-sm w-full h-10"
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            className='className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"'
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <ReactQuill
            className="h-96"
            value={content}
            onChange={setContent}
            modules={quillModules}
            formats={quillFormats}
          />
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-14 ml-96"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
