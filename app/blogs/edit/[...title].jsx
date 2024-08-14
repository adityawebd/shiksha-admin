import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { CircleUserRound, User } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom';
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditBlog() {
    

    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],              // toggled buttons
            ['blockquote', 'code-block'],                            // block elements
            ['link', 'image', 'video', 'formula'],                   // media
            [{ 'header': 1 }, { 'header': 2 }],                      // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }], // lists
            [{ 'script': 'sub' }, { 'script': 'super' }],            // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],                // outdent/indent
            [{ 'direction': 'rtl' }],                               // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],        // custom dropdown sizes
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],              // custom header sizes
            [{ 'color': [] }, { 'background': [] }],                 // color and background
            [{ 'font': [] }],                                       // font family
            [{ 'align': [] }],                                      // text alignment
            ['clean']                                                // remove formatting button
        ],
    };

    const quillFormats = [
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'link', 'image', 'video', 'formula',
        'header', 'list', 'bullet', 'check',
        'script', 'indent', 'direction',
        'size', 'color', 'background',
        'font', 'align',
        'clean'
    ];
    


    const [blogInfo, setBlogInfo] = useState([]);
    const [blogTitle, setBlogTitle] = useState('');
    const [content, setContent] = useState('');
    // const navigate = useNavigate();
    const router = useRouter();

    const { title } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/blogs?title=' + title);
            const result = await res.json();
            if (result.success) {
                setBlogTitle(result.data?.title);
                setContent(result.data?.content);
            }
        };

        fetchData();
    }, [title]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const blogData = {
            title,
            content
        };

        console.log(blogData)

        if (title) {
            axios.put(`api/blogs/${title}`, blogData)
                .then(() => {
                    // window.location.replace('/blogs')
                })
                .catch(error => {
                    console.error('There was an error updating the blog!', error);
                });
        } else {
            axios.post('/api/blogs', blogData)
                .then(() => {
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('There was an error creating the blog!', error);
                });
        }
    };

    return (
        <div className='bg-white h-full p-4'>
            <h1 className="h-1 mb-10  font-bold text-3xl" >{'Edit Blog'}</h1>
            <form onSubmit={handleSubmit}>
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
                        className='h-96'
                        value={content}
                        onChange={setContent}
                        modules={quillModules}
                        formats={quillFormats}
                    />
                    <button type="submit" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-14 ml-96" >Save</button>
                </div>
            </form>
        </div>
    );
}