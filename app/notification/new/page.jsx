'use client'
import React, { useState  ,useEffect} from 'react'
import Sidebar from '../../comoponents/Sidebar'
import Notification from '../../comoponents/Notification '
import Notificationform from '../../comoponents/Notificationform'
import axios from 'axios';
import { ReactSortable } from "react-sortablejs";
import Spinner from "../../comoponents/Spinner";



const Page = () => {
    const [images, setImages] = useState('');
    const [notification, setNotification] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        type: '',
        images: '',
        title: '',
        message: '',
        date: '',
        notificationData: '',
        importantDate: {
            heading: 'Important Dates',
            table_data: [{ event_name: '', date: '' }],
        },
        applicationFee: {
            heading: 'Application fee',
            table_data: [{ category: '', fee: '' }],
            note: '',
        },
        vacancyDetails: {
            heading: 'Vacancy Details',
            table_data: [{ postName: '', totalPosts: '' }],
        },
        eligibilityCriteria: {
            heading: 'Eligibility Criteria',
            listItems: [{ item: '' }],
            table_data: [{ name: '', type: '', posts: '' }],
        },
        howToApply: {
            heading: 'How to Apply ',
            table_data: [{ step: '' }],
        },
        usefulLinks: {
            heading: 'Usefull links ',
            table_data: [{ linkDesc: '', url: '' }],
        },
        notiFooterData: '',
    });

    const [fformdata,setfformdata]=useState([])

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

    const handleCloseNotification = () => {
        setNotification(null);
    };

    // Handle general input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleChangeinternal = (e) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');

        if (section in formData) {
            if (field in formData[section]) {
                setFormData({
                    ...formData,
                    [section]: {
                        ...formData[section],
                        [field]: value,
                    },
                });
            }
        }
    };

    // Handle change for nested objects with arrays
    const handleNestedChange = (e, section, index, field) => {
        const updatedSection = formData[section].table_data.map((item, idx) =>
            idx === index ? { ...item, [field]: e.target.value } : item
        );
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                table_data: updatedSection,
            },
        });
    };

    // Handle change for list items in eligibilityCriteria and howToApply
    const handleListChange = (e, section, index) => {
        const updatedSection = formData[section].listItems.map((item, idx) =>
            idx === index ? { ...item, item: e.target.value } : item
        );
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                listItems: updatedSection,
            },
        });
    };

    // Add new row in table data
    const handleAddRow = (section) => {
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                table_data: [...formData[section].table_data, {}],
            },
        });
    };

    // Remove a row in table data
    const handleRemoveRow = (section, index) => {
        const updatedSection = formData[section].table_data.filter((_, idx) => idx !== index);
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                table_data: updatedSection,
            },
        });
    };

    // Add new item in list
    const handleAddItem = (section) => {
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                listItems: [...formData[section].listItems, { item: '' }],
            },
        });
    };

    // Remove an item in list
    const handleRemoveItem = (section, index) => {
        const updatedSection = formData[section].listItems.filter((_, idx) => idx !== index);
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                listItems: updatedSection,
            },
        });
    };

    const fetchImageAsBase64 = async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };


    useEffect(() => {
        if (formData) {
          const combinedData = {
            ...formData,
            images: images[0]
            
    
          };
          setfformdata(combinedData);
        }
      }, [formData,images]);


      console.log("final form dataa is ",fformdata," but pehle wala was",formData)

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Assume `imageUrl` is the URL of the image coming from another source
        const imageUrl = images;
    
        try {
            // Fetch and convert image to base64
            const imageBase64 = await fetchImageAsBase64(imageUrl);

            console.log(images)
            
            // Update formData with the base64 image string
            setFormData(prevState => ({
                ...prevState,
                images: images[0]
            }));

            
    
            console.log("img url is", formData.images);
    
            const response = await fetch('/api/notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fformdata),
            });
            const result = await response.json();
            console.log('Notification created:', result);
            setNotification({ message: 'Information added successfully', status: 'success' });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };
    



    return (
        <div>
            <div className="flex overflow-hidden">
                <Sidebar />
                <div className="w-11/12 left-72">
                    <div className="  ml-64">
                        {notification && (
                            <Notification
                                message={notification.message}
                                status={notification.status}
                                onClose={handleCloseNotification}
                            />
                        )}
                        {/* <Notificationform/> */}
                        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-6">
                            {/* Type */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Type</option>
                                    <option value="normal">Normal</option>
                                    <option value="live">Live</option>
                                </select>
                            </div>

                            {/* Image */}
                            <div>
                                 <label className="block text-sm font-medium text-gray-700">Image</label>
                                 {/*
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                /> */}
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
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700">Notification footer</label>
                                <input
                                    type="text"
                                    name="notiFooterData"
                                    value={formData.notiFooterData}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Notification Data */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Notification Data</label>
                                <textarea
                                    name="notificationData"
                                    value={formData.notificationData}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>

                            {/* Important Date */}
                            <div className='flex row'>
                                <h1 className='text-center h1'>Importent Date</h1>
                                {formData.importantDate.table_data.map((item, index) => (
                                    <div key={index} className="mt-4 space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Event Name</label>
                                            <input
                                                type="text"
                                                value={item.event_name}
                                                onChange={(e) => handleNestedChange(e, 'importantDate', index, 'event_name')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Date</label>
                                            <input
                                                type="date"
                                                value={item.date}
                                                onChange={(e) => handleNestedChange(e, 'importantDate', index, 'date')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRow('importantDate', index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Remove Event
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddRow('importantDate')}
                                    className=" text-white bg-blue-500 hover:bg-blue-700 mt-3 p-2 rounded w-28"
                                >
                                    Add Event
                                </button>
                            </div>

                            {/* Application Fee */}
                            <div className='flex row'>
                                <h1 className='text-center h1'>Application Fee</h1>

                                {formData.applicationFee.table_data.map((item, index) => (
                                    <div key={index} className="mt-4 space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <input
                                                type="text"
                                                value={item.category}
                                                onChange={(e) => handleNestedChange(e, 'applicationFee', index, 'category')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Fee</label>
                                            <input
                                                type="text"
                                                value={item.fee}
                                                onChange={(e) => handleNestedChange(e, 'applicationFee', index, 'fee')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRow('applicationFee', index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Remove Fee
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddRow('applicationFee')}
                                    className=" text-white bg-blue-500 hover:bg-blue-700 mt-3 p-2 rounded w-28"
                                >
                                    Add Fee
                                </button>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Application Fee Note</label>
                                    <textarea
                                        name="applicationFee.note"
                                        value={formData.applicationFee.note}
                                        onChange={handleChangeinternal}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Vacancy Details */}
                            <div className='flex row' >
                                <h1 className='text-center h1'>Vacancy Details</h1>
                                {formData.vacancyDetails.table_data.map((item, index) => (
                                    <div key={index} className="mt-4 space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Post Name</label>
                                            <input
                                                type="text"
                                                value={item.postName}
                                                onChange={(e) => handleNestedChange(e, 'vacancyDetails', index, 'postName')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Total Posts</label>
                                            <input
                                                type="text"
                                                value={item.totalPosts}
                                                onChange={(e) => handleNestedChange(e, 'vacancyDetails', index, 'totalPosts')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRow('vacancyDetails', index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Remove Vacancy
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddRow('vacancyDetails')}
                                    className=" text-white bg-blue-500 hover:bg-blue-700 mt-3 p-2 rounded w-28"
                                >
                                    Add Vacancy
                                </button>
                            </div>

                            {/* Eligibility Criteria */}
                            <div className='flex row' >
                                <h1 className='text-center h1'>Eligibility Criteria</h1>
                                {/* {formData.eligibilityCriteria.listItems.map((item, index) => (
                                    <div key={index} className="mt-4 space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Item</label>
                                            <input
                                                type="text"
                                                value={item.item}
                                                onChange={(e) => handleListChange(e, 'eligibilityCriteria', index)}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem('eligibilityCriteria', index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Remove Item
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddItem('eligibilityCriteria')}
                                     className=" text-white bg-blue-500 hover:bg-blue-700 mt-3 p-2 rounded w-28"
                                >
                                    Add Item
                                </button> */}

                                {/* Eligibility Criteria Table */}
                                {formData.eligibilityCriteria.table_data.map((item, index) => (
                                    <div key={index} className="mt-4 space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                value={item.name}
                                                onChange={(e) => handleNestedChange(e, 'eligibilityCriteria', index, 'name')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Type</label>
                                            <input
                                                type="text"
                                                value={item.type}
                                                onChange={(e) => handleNestedChange(e, 'eligibilityCriteria', index, 'type')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Posts</label>
                                            <input
                                                type="text"
                                                value={item.posts}
                                                onChange={(e) => handleNestedChange(e, 'eligibilityCriteria', index, 'posts')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRow('eligibilityCriteria', index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Remove Eligibility
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddRow('eligibilityCriteria')}
                                    className=" text-white bg-blue-500 hover:bg-blue-700 mt-3 p-1 rounded w-28"
                                >
                                    Add Eligibility
                                </button>
                            </div>

                            {/* How to Apply */}
                            <div className='flex row' >
                                <h1 className='text-center h1'>How to Apply</h1>
                                {formData.howToApply.table_data?.map((item, index) => (
                                    <div key={index} className="mt-4 space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Step</label>
                                            <input
                                                type="text"
                                                value={item.step}
                                                onChange={(e) => handleNestedChange(e, 'howToApply', index, 'step')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRow('howToApply', index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Remove Step
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddRow('howToApply')}
                                    className=" text-white bg-blue-500 hover:bg-blue-700 mt-3 p-2 rounded w-28"
                                >
                                    Add Step
                                </button>
                            </div>

                            {/* Useful Links */}
                            <div className='flex row' >
                                <h1 className='text-center h1'>How to Apply</h1>

                                {formData.usefulLinks?.table_data.map((link, index) => (
                                    <div key={index} className="mt-4 space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Text</label>
                                            <input
                                                type="text"
                                                value={link.linkDesc}
                                                onChange={(e) => handleNestedChange(e, 'usefulLinks', index, 'linkDesc')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">URL</label>
                                            <input
                                                type="text"
                                                value={link.url}
                                                onChange={(e) => handleNestedChange(e, 'usefulLinks', index, 'url')}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRow('usefulLinks', index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Remove Link
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddRow('usefulLinks')}
                                    className=" text-white bg-blue-500 hover:bg-blue-700 mt-3 p-2 rounded w-28"
                                >
                                    Add Link
                                </button>
                            </div>

                            <button
                                type="submit"

                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save notification
                            </button>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Page
