'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification '
import { useRouter } from 'next/navigation'
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner";

export default function CollagesForm({
    _id,
    id: existingId,
    name: existingName,
    title: existingTitle,
    collageIcon: existingcollageIcon,
    universitytype: existingUniversitytype,
    Estd: existingEstd,
    rating: existingRating,
    shortAddress: existingShortAddress,
    shortDiscription: existingShortDiscription,
}) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [universitytype, setUniversitytype] = useState('');
    const [Estd, setEstd] = useState('');
    const [rating, setRating] = useState('');
    const [collageIcon, setcollageIcon] = useState([]);
    const [shortAddress, setShortAddress] = useState('');
    const [shortDiscription, setShortDiscription] = useState('');
    const [notification, setNotification] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleCloseNotification = () => {
        setNotification(null);
    };



    const router = useRouter();

    useEffect(() => {
        setId(existingId || '');
        setName(existingName || '');
        setTitle(existingTitle || '');
        setcollageIcon(existingcollageIcon || []);
        setUniversitytype(existingUniversitytype || '');
        setEstd(existingEstd || '');
        setRating(existingRating || '');
        setShortAddress(existingShortAddress || '');
        setShortDiscription(existingShortDiscription || '');
    }, [
        existingId,
        existingName,
        existingTitle,
        existingcollageIcon,
        existingUniversitytype,
        existingEstd,
        existingRating,
        existingShortAddress,
        existingShortDiscription,
    ]);

    async function handleSubmit(ev) {
        ev.preventDefault();
        const data = { id, name,title, universitytype, Estd, collageIcon, rating, shortAddress, shortDiscription };
        try {
            if (_id) {
                // Update
                try {
                    await axios.put('/api/collegeslist', { ...data, _id });
                    setNotification({ message: 'Data Updated successfully', status: 'success' });

                }
                catch {
                    setNotification({ message: 'Error updating college', status: 'error' });
                }


            } else {
                // Create
                try {
                    await axios.post('/api/collegeslist', data);
                    setNotification({ message: 'Record Added successfully', status: 'success' });
                }
                catch {
                    setNotification({ message: 'Error adding college', status: 'error' });
                }


            }
            //   router.push('/collages');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
          setIsUploading(true);
          const data = new FormData();
          for (const file of files) {
            data.append('file', file);
          }
          const res = await axios.post('/api/upload', data);
          setcollageIcon(oldImages => {
            return [...oldImages, ...res.data.links];
          });
          setIsUploading(false);
        }
      }
    function updatecollageIconOrder(collageIcon) {
        setcollageIcon(collageIcon);
    }

    return (
        <div className="w-full float-left ml-32">
            <div className='w-11/12'>
                {notification && <Notification message={notification.message} status={notification.status}
                    onClose={handleCloseNotification} />}
                <form onSubmit={handleSubmit} className="w-11/12 p-10 bg-white rounded-lg grid grid-cols-3 gap-4 border-gray border-1 m-4">
                    <h1 className='col-span-3 h4'>Heading Information</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="ID">ID</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={id}
                            onChange={ev => setId(ev.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Title</label>
                        <input
                            type="text"
                            id="Title"
                            name="title"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="universitytype">University Type</label>
                        <input
                            type="text"
                            id="universitytype"
                            name="universitytype"
                            value={universitytype}
                            onChange={ev => setUniversitytype(ev.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="Estd">Established</label>
                        <input
                            type="text"
                            id="Estd"
                            name="Estd"
                            value={Estd}
                            onChange={ev => setEstd(ev.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="rating">Rating</label>
                        <input
                            type="text"
                            id="rating"
                            name="rating"
                            value={rating}
                            onChange={ev => setRating(ev.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        {collageIcon && (
                            <div className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                                <img src={collageIcon} alt="Uploaded Image" className="rounded-lg" height={100} width={100} />
                            </div>
                        )}
                        {isUploading && (
                            <div className="h-24 flex items-center">
                                <Spinner />
                            </div>
                        )}
                        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <div>
                                Add image
                            </div>
                            <input type="file" onChange={uploadImages} className="hidden" />
                        </label>
                    </div>

                    <div className="col-span-2 mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 h-10" htmlFor="shortAddress">Short Address</label>
                        <input
                            type="text"
                            id="shortAddress"
                            name="shortAddress"
                            value={shortAddress}
                            onChange={ev => setShortAddress(ev.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 "
                        />
                    </div>

                    <div className="col-span-3 mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="shortDiscription">Short Description</label>
                        <textarea
                            id="shortDiscription"
                            name="shortDiscription"
                            value={shortDiscription}
                            onChange={ev => setShortDiscription(ev.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>
                    </div>

                    <h1 className='col-span-3 h4'>Info Section</h1>


                    {/* form submit button */}
                    <div>   
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
