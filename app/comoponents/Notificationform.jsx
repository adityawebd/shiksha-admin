"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./Notification ";
import { useRouter } from "next/navigation";
import { FcDepartment } from "react-icons/fc";
import { FaUniversity } from "react-icons/fa";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { type } from "os";


export default function Notificationform({
    notification: existingNotification,
}) {

    const [formData, setFormData] = useState([]);
    const [information, setNotification] = useState([]);


    useEffect(() => {
        setFormData(existingNotification || []);
    }, [existingNotification])

    console.log("in data in notification form",formData)



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTableChange = (e, section, index, field) => {
        const { value } = e.target;
        setFormData((prevState) => {
            const updatedSection = [...prevState[section].table_data];
            updatedSection[index][field] = value;
            return {
                ...prevState,
                [section]: {
                    ...prevState[section],
                    table_data: updatedSection,
                },
            };
        });
    };

    const handleListChange = (e, section, index,field) => {
        const { value } = e.target;
        setFormData((prevState) => {
            const updatedSection = [...prevState[section].listItems];
            updatedSection[index][field] = value;
            return {
                ...prevState,
                [section]: {
                    ...prevState[section],
                    listItems: updatedSection,
                },
            };
        });
    };

    const handleAddRow = (section) => {
        setFormData((prevState) => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                table_data: [...prevState[section].table_data, { _id: Date.now().toString() }],
            },
        }));
    };

    const handleRemoveRow = (section, index) => {
        setFormData((prevState) => {
            const updatedSection = [...prevState[section].table_data];
            updatedSection.splice(index, 1);
            return {
                ...prevState,
                [section]: {
                    ...prevState[section],
                    table_data: updatedSection,
                },
            };
        });
    };

    const handleAddListItem = (section) => {
        setFormData((prevState) => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                listItems: [...prevState[section].listItems, { _id: Date.now().toString(), item: '' }],
            },
        }));
    };

    const handleRemoveListItem = (section, index) => {
        setFormData((prevState) => {
            const updatedSection = [...prevState[section].listItems];
            updatedSection.splice(index, 1);
            return {
                ...prevState,
                [section]: {
                    ...prevState[section],
                    listItems: updatedSection,
                },
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };


    async function handleSubmitInformation(e) {
        e.preventDefault();
        const item = formData;
        const data = { ...item };
        console.log("submiting ifo",item)
        try {
            // if (item.title) {
                // Update
                await axios.put('/api/notification', { ...data, title: item.title });
                setNotification({ message: 'Information updated successfully', status: 'success' });
            // } else {
            //     // Create
            //     await axios.post('/api/information', data);
            //     setNotification({ message: 'Information added successfully', status: 'success' });
            // }
        } catch (error) {
            console.error('Error submitting form:', error);
            setNotification({ message: 'Error submitting information', status: 'error' });
        }
    }


    // const updateNotificationField = (index, field, value) => {
    //     const newNotification = [...notification];
    //     newNotification[index][field] = value;
    //     setNotification(newNotification);
    // }

    // const updateimportantDateField = (itemIndex, notImportantDateIndex, field, value) => {
    //     const newNotification = [...importantdate];
    //     newNotification[itemIndex].importantdate[notImportantDateIndex][field] = value;
    //     setNotification(newNotification);
    // }







    return (
        <div className="w-full float-left ml-32">
            <div className="11/12">
                {/* <div className="bg-slate-500 rounded-lg shadow-lg p-4 my-5">
                    <h1 className="text-center h1">Notification</h1>
                    {notification.length > 0 ? (
                        notification.map((item, index) => (
                            <form key={item._id} className="p-4 bg-white rounded-lg grid grid-cols-3 gap-4 border-gray border-1 m-4">
                                <div className="mb-4">
                                    <label htmlFor={`itemId-${index}`}>Notifcation Id</label>
                                    <input
                                        ttype="text"
                                        id={`itemId-${index}`}
                                        name="id"
                                        value={item._id || ''}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                        onChange={(e) => updateNotificationField(index, "_id", e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor={`itemtitle-${index}`}>
                                        Notification Title
                                    </label>
                                    <input
                                        type="text"
                                        id={`itemPageTitle-${index}`}
                                        name="page_title"
                                        value={item.title || ''}
                                        onChange={(ev) => updateNotificationField(index, 'title', ev.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor={`itemmessage-${index}`}>
                                        Notification message
                                    </label>
                                    <input
                                        type="text"
                                        id={`itemmessage-${index}`}
                                        name="message"
                                        value={item.message || ''}
                                        onChange={(ev) => updateNotificationField(index, 'message', ev.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor={`itemtype-${index}`}>
                                        Notification Type
                                    </label>
                                    <input
                                        type="text"
                                        id={`itemtype-${index}`}
                                        name="type"
                                        value={item.type || ''}
                                        onChange={(ev) => updateNotificationField(index, 'type', ev.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor={`itemnotificationData-${index}`}>
                                        Notification Data
                                    </label>
                                    <input
                                        type="text"
                                        id={`itemnotificationData-${index}`}
                                        name="notificationData"
                                        value={item.notificationData || ''}
                                        onChange={(ev) => updateNotificationField(index, 'notificationData', ev.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor={`itemnotiFooterData-${index}`}>
                                        Notification Footer Data
                                    </label>
                                    <input
                                        type="text"
                                        id={`itemnotiFooterData-${index}`}
                                        name="notiFooterData"
                                        value={item.notiFooterData || ''}
                                        onChange={(ev) => updateNotificationField(index, 'notiFooterData', ev.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor={`itemdate-${index}`}>
                                        Notification Date
                                    </label>
                                    <input
                                        type="date"
                                        id={`itemdate-${index}`}
                                        name="date"
                                        value={item.date || ''}
                                        onChange={(ev) => updateNotificationField(index, 'date', ev.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4 col-span-3">
                                    <h1 className="text-lg font-semibold text-center h1">Important Dates</h1>
                                    {item.importantdate.map((importantdate, importdate) => (
                                        <div key={importantdate._id} className="mb-4 flex" >


                                        </div>
                                    ))}



                                </div>



                            </form>
                        ))

                    ) : (
                        <p>No Notificatio information available </p>
                    )}

                </div> */}





                <form onSubmit={(e)=>handleSubmitInformation(e)} className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
                    {/* Basic Information */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Message</label>
                        <textarea
                            name="message"
                            value={formData.message || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Notification Data</label>
                        <textarea
                            name="notificationData"
                            value={formData.notificationData || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Important Dates */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Dates</h3>
                        {formData.importantDate?.table_data?.map((date, index) => (
                            <div key={date._id} className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Event Name</label>
                                <input
                                    type="text"
                                    value={date.event_name || ''}
                                    onChange={(e) => handleTableChange(e, 'importantDate', index, 'event_name')}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <label className="block text-gray-600 font-medium mb-1">Date</label>
                                <input
                                    type="text"
                                    value={date.date || ''}
                                    onChange={(e) => handleTableChange(e, 'importantDate', index, 'date')}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRow('importantDate', index)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddRow('importantDate')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add Date
                        </button>
                    </div>

                    {/* Application Fee */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Application Fee</h3>
                        {formData.applicationFee?.table_data?.map((fee, index) => (
                            <div key={fee._id} className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Category</label>
                                <input
                                    type="text"
                                    value={fee.category || ''}
                                    onChange={(e) => handleTableChange(e, 'applicationFee', index, 'category')}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <label className="block text-gray-600 font-medium mb-1">Fee</label>
                                <input
                                    type="text"
                                    value={fee.fee || ''}
                                    onChange={(e) => handleTableChange(e, 'applicationFee', index, 'fee')}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRow('applicationFee', index)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddRow('applicationFee')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add Fee
                        </button>
                        <div className="mt-4">
                            <label className="block text-gray-600 font-medium mb-1">Note</label>
                            <textarea
                                name="applicationFee.note"
                                value={formData.applicationFee?.note || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Vacancy Details */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Vacancy Details</h3>
                        {formData.vacancyDetails?.table_data?.map((vacancy, index) => (
                            <div key={vacancy._id} className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Post Name</label>
                                <input
                                    type="text"
                                    value={vacancy.postName || ''}
                                    onChange={(e) => handleTableChange(e, 'vacancyDetails', index, 'postName')}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <label className="block text-gray-600 font-medium mb-1">Total Seats</label>
                                <input
                                    type="text"
                                    value={vacancy.totalPosts || ''}
                                    onChange={(e) => handleTableChange(e, 'vacancyDetails', index, 'totalPosts')}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRow('vacancyDetails', index)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddRow('vacancyDetails')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add Vacancy
                        </button>
                    </div>

                    {/* Eligibility Criteria */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Eligibility Criteria</h3>
                        {formData.eligibilityCriteria?.table_data?.map((item, index) => (
                            <div key={item._id} className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={item.name || ''}
                                    onChange={(e) => handleListChange(e, 'eligibilityCriteria', index,name)}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <label className="block text-gray-600 font-medium mb-1">Education Level</label>
                                <input
                                    type="text"
                                    value={item.type || ''}
                                    onChange={(e) => handleListChange(e, 'eligibilityCriteria', index,type)}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <label className="block text-gray-600 font-medium mb-1">Posts</label>
                                <input
                                    type="text"
                                    value={item.posts || ''}
                                    onChange={(e) => handleListChange(e, 'eligibilityCriteria',index,posts)}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRow('eligibilityCriteria', index)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddRow('eligibilityCriteria')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add Criteria
                        </button>
                    </div>

                    {/* How to Apply */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Apply</h3>
                        <textarea
                            name="howToApply"
                            value={formData.howToApply || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Useful Links */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Useful Links</h3>
                        {formData.usefulLinks?.table_data?.map((link, index) => (
                            <div key={link._id} className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Link Description</label>
                                <input
                                    type="text"
                                    value={link.linkDesc || ''}
                                    onChange={(e) => handleListChange(e, 'usefulLinks', index,linkDesc)}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <label className="block text-gray-600 font-medium mb-1">URL</label>
                                <input
                                    type="text"
                                    value={link.url || ''}
                                    onChange={(e) => handleListChange(e, 'usefulLinks', index,url)}
                                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRow('usefulLinks', index)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddRow('usefulLinks')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add Link
                        </button>
                    </div>

                    {/* Footer Data */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Footer Data</h3>
                        <textarea
                            name="footerData"
                            value={formData.footerData || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>

            </div>
        </div>
    )

}