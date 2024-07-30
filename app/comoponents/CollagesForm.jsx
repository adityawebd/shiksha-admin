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
    department: existingDepartments,
    admission: existingAdmissions,
}) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [universitytype, setUniversitytype] = useState("");
    const [Estd, setEstd] = useState("");
    const [rating, setRating] = useState("");
    const [collageIcon, setcollageIcon] = useState([]);
    const [shortAddress, setShortAddress] = useState("");
    const [shortDiscription, setShortDiscription] = useState("");
    const [notification, setNotification] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Departement data
    const [departments, setDepartments] = useState([]);

    //Admission data
    const [admissions, setAdmissions] = useState([]);

    const handleCloseNotification = () => {
        setNotification(null);
    };

    const router = useRouter();

    useEffect(() => {
        setId(existingId || "");
        setName(existingName || "");
        setTitle(existingTitle || "");
        setcollageIcon(existingcollageIcon || []);
        setUniversitytype(existingUniversitytype || "");
        setEstd(existingEstd || "");
        setRating(existingRating || "");
        setShortAddress(existingShortAddress || "");
        setShortDiscription(existingShortDiscription || "");
        setDepartments(existingDepartments || []);
        setAdmissions(existingAdmissions || []);
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
        existingDepartments,
        existingAdmissions,
    ]);



    function updateImagesOrder(images) {
        setcollageIcon(images);
    }



    async function handleSubmit(ev) {
        ev.preventDefault();
        const data = {
            id,
            name,
            title,
            universitytype,
            Estd,
            collageIcon,
            rating,
            shortAddress,
            shortDiscription,
        };
        try {
            if (_id) {
                // Update
                await axios.put("/api/collegeslist", { ...data, _id });
                setNotification({
                    message: "College data updated successfully",
                    status: "success",
                });
            } else {
                // Create
                await axios.post("/api/collegeslist", data);
                setNotification({
                    message: "College record added successfully",
                    status: "success",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setNotification({
                message: "Error submitting college data",
                status: "error",
            });
        }
    }

    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            // Simulated data from an API
            const res = await fetch(`/api/department?college=${name}`);
            const result = await res.json();
            if (result.success) {
                setDepartments(result.data);
            }
        };

        fetchData();
    }, []);



    const addDepartment = () => {
        setDepartments([
            ...departments,
            {
                id: "",
                title: "",
                college: "",
                course: "",
                fees: "",
                location: "",
                imgSrc: "",
                view_all_courses_link: "",
            },
        ]);
    };

    async function removeDepartment(index, data) {
        await axios.delete(`/api/department?id=${data}`);
        setDepartments(departments.filter((_, i) => i !== index));
    }

    const updateDepartmentField = (index, field, value) => {
        const updatedDepartments = departments.map((department, i) =>
            i === index ? { ...department, [field]: value } : department
        );
        setDepartments(updatedDepartments);
    };

    async function handleSubmitDepartment(ev, index) {
        ev.preventDefault();
        const department = departments[index];
        const data = { ...department };
        try {
            if (department._id) {
                // Update
                await axios.put("/api/department", { ...data, _id: department._id });
                setNotification({
                    message: "Department data updated successfully",
                    status: "success",
                });
            } else {
                // Create
                await axios.post("/api/department", data);
                setNotification({
                    message: "Department record added successfully",
                    status: "success",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setNotification({
                message: "Error submitting department data",
                status: "error",
            });
        }
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
            setcollageIcon((oldImages) => [...oldImages, ...res.data.links]);
            setIsUploading(false);
        }
    }

    //Admission  data
    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            // Simulated data from an API
            const res = await fetch(`/api/admission?college=${name}`);
            const result = await res.json();
            if (result.success) {
                setAdmissions(result.data);
            }
        };

        fetchData();
    }, []);

    console.log("admmision data is 1", admissions);

    const addAdmission = () => {
        setAdmissions([
            ...admissions,
            {
                className: "",
                college: "",
                name: "",
                cutOffData: [],
                expiredEventsTableData: [],
                importantEventsTableData: [],
                h5_1: "",
                h5_2: "",
                // _id: "",
            },
        ]);
    };

    async function removeAdmission(index, id) {
        await axios.delete(`/api/admission?id=${id}`);
        setAdmissions(admissions.filter((_, i) => i !== index));
    }

    const updateAdmissionField = (index, field, value) => {
        const updatedAdmissions = admissions.map((admission, i) =>
            i === index ? { ...admission, [field]: value } : admission
        );
        setAdmissions(updatedAdmissions);
    };

    async function handleSubmitAdmission(ev, index) {
        ev.preventDefault();
        const admission = admissions[index];
        const data = { ...admission };
        try {
            if (admission._id) {
                // Update
                await axios.put("/api/admission", { ...data, _id: admission._id });
                setNotification({
                    message: "Admission data updated successfully",
                    status: "success",
                });
            } else {
                // Create
                await axios.post("/api/admission", data);
                setNotification({
                    message: "Admission record added successfully",
                    status: "success",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setNotification({
                message: "Error submitting admission data",
                status: "error",
            });
        }
    }

    console.log("admmision data is  2", admissions);
    function updatecollageIconOrder(collageIcon) {
        setcollageIcon(collageIcon);
    }

    const updateAdmissionEventField = (admissionIndex, eventIndex, eventType, field, value) => {
        const updatedAdmissions = [...admissions];
        updatedAdmissions[admissionIndex][eventType][eventIndex][field] = value;
        setAdmissions(updatedAdmissions);
    };

    const addAdmissionEvent = (admissionIndex, eventType) => {
        const updatedAdmissions = [...admissions];
        updatedAdmissions[admissionIndex][eventType].push({
            event_name: '',
            event_tag: '',
            event_date: '',
            //   _id: Date.now().toString()
        });
        setAdmissions(updatedAdmissions);
    };

    const removeAdmissionEvent = (admissionIndex, eventIndex, eventType) => {
        const updatedAdmissions = [...admissions];
        updatedAdmissions[admissionIndex][eventType].splice(eventIndex, 1);
        setAdmissions(updatedAdmissions);
    };

    const updateAdmissionCutoffField = (admissionIndex, cutoffIndex, courseIndex, field, value) => {
        const updatedAdmissions = [...admissions];
        if (courseIndex === null) {
            updatedAdmissions[admissionIndex].cutOffData[cutoffIndex][field] = value;
        } else {
            updatedAdmissions[admissionIndex].cutOffData[cutoffIndex].cutOffDataTable[courseIndex][field] = value;
        }
        setAdmissions(updatedAdmissions);
    };

    const addAdmissionCutoff = (admissionIndex, cutoffIndex) => {
        const updatedAdmissions = [...admissions];
        updatedAdmissions[admissionIndex].cutOffData[cutoffIndex].cutOffDataTable.push({
            courses: '',
            cutoff_year1: '',
            cutoff_year2: '',
            cutoff_year3: '',
            cutoff_year4: '',
            //   _id: Date.now().toString()
        });
        setAdmissions(updatedAdmissions);
    };

    const removeAdmissionCutoff = (admissionIndex, cutoffIndex, courseIndex) => {
        const updatedAdmissions = [...admissions];
        updatedAdmissions[admissionIndex].cutOffData[cutoffIndex].cutOffDataTable.splice(courseIndex, 1);
        setAdmissions(updatedAdmissions);
    };



    return (
        <div className="w-full float-left ml-32">
            {notification && (
                <Notification
                    message={notification.message}
                    status={notification.status}
                    onClose={handleCloseNotification}
                />
            )}

            <div className=" w-11/12">
                <div className="bg-white rounded-lg shadow-lg p-4 my-5">
                    <form
                        onSubmit={handleSubmit}
                        className="w-11/12 p-10 bg-white rounded-lg grid grid-cols-3 gap-4 border-gray border-1 m-4"
                    >
                        <h1 className="col-span-3 h4">College Information</h1>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="ID"
                            >
                                ID
                            </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={id}
                                onChange={(ev) => setId(ev.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(ev) => setTitle(ev.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="universitytype"
                            >
                                University Type
                            </label>
                            <input
                                type="text"
                                id="universitytype"
                                name="universitytype"
                                value={universitytype}
                                onChange={(ev) => setUniversitytype(ev.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="Estd"
                            >
                                Established
                            </label>
                            <input
                                type="text"
                                id="Estd"
                                name="Estd"
                                value={Estd}
                                onChange={(ev) => setEstd(ev.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="rating"
                            >
                                Rating
                            </label>
                            <input
                                type="text"
                                id="rating"
                                name="rating"
                                value={rating}
                                onChange={(ev) => setRating(ev.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <ReactSortable
                                list={collageIcon}
                                className="flex flex-wrap gap-1"
                                setList={updateImagesOrder}>
                                {collageIcon && collageIcon.length > 0 && (
                                    <div className="h-24 w-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200 flex items-center justify-center m-7">
                                        <img
                                            src={collageIcon[collageIcon.length - 1]}
                                            alt="Uploaded Image"
                                            className="rounded-lg object-contain"
                                            height={100}
                                            width={100}
                                        />
                                    </div>
                                )}
                            </ReactSortable>
                            {isUploading && (
                                <div className="h-24 flex items-center">
                                    <Spinner />
                                </div>
                            )}
                            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                <div>Upload</div>
                                <input type="file" onChange={uploadImages} className="hidden" />
                            </label>
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="shortAddress"
                            >
                                Short Address
                            </label>
                            <input
                                type="text"
                                id="shortAddress"
                                name="shortAddress"
                                value={shortAddress}
                                onChange={(ev) => setShortAddress(ev.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="mb-4 col-span-3">
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="shortDiscription"
                            >
                                Short Description
                            </label>
                            <textarea
                                id="shortDiscription"
                                name="shortDiscription"
                                value={shortDiscription}
                                onChange={(ev) => setShortDiscription(ev.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Save
                        </button>
                    </form>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 my-5">
                    <h1 className="col-span-3 h4">
                        <span className="flex mx-4">
                            Department Information <FcDepartment className="mx-4" />
                        </span>{" "}
                    </h1>
                    {departments.length > 0 ? (
                        departments.map((department, index) => (
                            <form
                                key={department._id}
                                onSubmit={(ev) => handleSubmitDepartment(ev, index)}
                                className="p-4 bg-white rounded-lg grid grid-cols-3 gap-4 border-gray border-1 m-4"
                            >
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`departmentId-${index}`}
                                    >
                                        ID
                                    </label>
                                    <input
                                        type="text"
                                        id={`departmentId-${index}`}
                                        name="id"
                                        value={department.id}
                                        onChange={(ev) =>
                                            updateDepartmentField(index, "id", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`departmentTitle-${index}`}
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id={`departmentTitle-${index}`}
                                        name="title"
                                        value={department.title}
                                        onChange={(ev) =>
                                            updateDepartmentField(index, "title", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`departmentCollege-${index}`}
                                    >
                                        College
                                    </label>
                                    <input
                                        type="text"
                                        id={`departmentCollege-${index}`}
                                        name="college"
                                        value={department.college}
                                        onChange={(ev) =>
                                            updateDepartmentField(index, "college", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`departmentCourse-${index}`}
                                    >
                                        Course
                                    </label>
                                    <input
                                        type="text"
                                        id={`departmentCourse-${index}`}
                                        name="course"
                                        value={department.course}
                                        onChange={(ev) =>
                                            updateDepartmentField(index, "course", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`departmentFees-${index}`}
                                    >
                                        Fees
                                    </label>
                                    <input
                                        type="text"
                                        id={`departmentFees-${index}`}
                                        name="fees"
                                        value={department.fees}
                                        onChange={(ev) =>
                                            updateDepartmentField(index, "fees", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`departmentLocation-${index}`}
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id={`departmentLocation-${index}`}
                                        name="location"
                                        value={department.location}
                                        onChange={(ev) =>
                                            updateDepartmentField(index, "location", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`departmentImgSrc-${index}`}
                                    >
                                        Image Source
                                    </label>
                                    <input
                                        type="text"
                                        id={`departmentImgSrc-${index}`}
                                        name="imgSrc"
                                        value={department.imgSrc}
                                        onChange={(ev) =>
                                            updateDepartmentField(index, "imgSrc", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4 col-span-3">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`departmentViewLink-${index}`}
                                    >
                                        View All Courses Link
                                    </label>
                                    <input
                                        type="text"
                                        id={`departmentViewLink-${index}`}
                                        name="view_all_courses_link"
                                        value={department.view_all_courses_link}
                                        onChange={(ev) =>
                                            updateDepartmentField(
                                                index,
                                                "view_all_courses_link",
                                                ev.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                                >
                                    Save Department
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeDepartment(index, department._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                                >
                                    Remove Department
                                </button>
                            </form>
                        ))
                    ) : (
                        <p>No departments Data available.</p>
                    )}
                    <button
                        onClick={addDepartment}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                    >
                        Add New Department
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4 my-5">
                    <h1 className="col-span-3 h4">
                        <span className="flex mx-4">
                            Admission
                            <FaUniversity className="mx-4" />
                        </span>{" "}
                    </h1>

                    {admissions.length > 0 ? (
                        admissions.map((admission, index) => (
                            <form
                                key={admission._id}
                                onSubmit={(ev) => handleSubmitAdmission(ev, index)}
                                className="p-4 bg-white rounded-lg grid grid-cols-3 gap-4 border-gray border-1 m-4"
                            >
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`admissionId-${index}`}
                                    >
                                        ID
                                    </label>
                                    <input
                                        type="text"
                                        id={`admissionId-${index}`}
                                        name="id"
                                        value={admission._id}
                                        readOnly
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`admissionClassName-${index}`}
                                    >
                                        Class Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`admissionClassName-${index}`}
                                        name="className"
                                        value={admission.className}
                                        onChange={(ev) =>
                                            updateAdmissionField(index, "className", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`admissionCollege-${index}`}
                                    >
                                        College
                                    </label>
                                    <input
                                        type="text"
                                        id={`admissionCollege-${index}`}
                                        name="college"
                                        value={admission.college}
                                        onChange={(ev) =>
                                            updateAdmissionField(index, "college", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>

                                <div className="mb-4 col-span-3">
                                    <label
                                        className="block text-gray-700 font-semibold mb-2"
                                        htmlFor={`admissionName-${index}`}
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`admissionName-${index}`}
                                        name="name"
                                        value={admission.name}
                                        onChange={(ev) =>
                                            updateAdmissionField(index, "name", ev.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>

                                {/* Important Events Table */}
                                <div className="col-span-3">
                                    <h5 className="text-lg font-semibold mb-2">Important Events</h5>
                                    {admission.importantEventsTableData.map((event, eventIndex) => (
                                        <div key={event._id} className="mb-4 grid grid-cols-4 gap-4 items-end">
                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">
                                                    Event Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={event.event_name}
                                                    onChange={(ev) =>
                                                        updateAdmissionEventField(index, eventIndex, "importantEventsTableData", "event_name", ev.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">
                                                    Event Tag
                                                </label>
                                                <input
                                                    type="text"
                                                    value={event.event_tag}
                                                    onChange={(ev) =>
                                                        updateAdmissionEventField(index, eventIndex, "importantEventsTableData", "event_tag", ev.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">
                                                    Event Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={event.event_date}
                                                    onChange={(ev) =>
                                                        updateAdmissionEventField(index, eventIndex, "importantEventsTableData", "event_date", ev.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAdmissionEvent(index, eventIndex, "importantEventsTableData")}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addAdmissionEvent(index, "importantEventsTableData")}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                                    >
                                        Add Event
                                    </button>
                                </div>

                                {/* Expired Events Table */}
                                <div className="col-span-3">
                                    <h5 className="text-lg font-semibold mb-2 ">Expired Events</h5>
                                    {admission.expiredEventsTableData.map((event, eventIndex) => (
                                        <div key={event._id} className="mb-4 grid grid-cols-4 gap-4 items-end">
                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">
                                                    Event Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={event.event_name}
                                                    onChange={(ev) =>
                                                        updateAdmissionEventField(index, eventIndex, "expiredEventsTableData", "event_name", ev.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">
                                                    Event Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={(event.event_date)}
                                                    onChange={(ev) =>
                                                        updateAdmissionEventField(index, eventIndex, "expiredEventsTableData", "event_date", ev.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAdmissionEvent(index, eventIndex, "expiredEventsTableData")}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addAdmissionEvent(index, "expiredEventsTableData")}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                                    >
                                        Add Event
                                    </button>
                                </div>

                                {/* Cutoff Data */}
                                <div className="col-span-3">
                                    <h5 className="text-lg font-semibold mb-2">Cutoff Data</h5>
                                    {admission.cutOffData.map((cutoff, cutoffIndex) => (
                                        <div key={cutoff._id} className="mb-4">
                                            <div className="mb-2">
                                                <label className="block text-gray-700 font-semibold mb-2">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cutoff.title}
                                                    onChange={(ev) =>
                                                        updateAdmissionCutoffField(index, cutoffIndex, null, "title", ev.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-gray-700 font-semibold mb-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={cutoff.para}
                                                    onChange={(ev) =>
                                                        updateAdmissionCutoffField(index, cutoffIndex, null, "para", ev.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                            </div>
                                            {cutoff.cutOffDataTable.map((course, courseIndex) => (
                                                <div key={course._id} className="grid grid-cols-5 gap-4 items-end mb-4">
                                                    <div>
                                                        <label className="block text-gray-700 font-semibold mb-2">
                                                            Course
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={course.courses}
                                                            onChange={(ev) =>
                                                                updateAdmissionCutoffField(index, cutoffIndex, courseIndex, "courses", ev.target.value)
                                                            }
                                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 font-semibold mb-2">
                                                            Year 1 Cutoff
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={course.cutoff_year1}
                                                            onChange={(ev) =>
                                                                updateAdmissionCutoffField(index, cutoffIndex, courseIndex, "cutoff_year1", ev.target.value)
                                                            }
                                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 font-semibold mb-2">
                                                            Year 2 Cutoff
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={course.cutoff_year2}
                                                            onChange={(ev) =>
                                                                updateAdmissionCutoffField(index, cutoffIndex, courseIndex, "cutoff_year2", ev.target.value)
                                                            }
                                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 font-semibold mb-2">
                                                            Year 3 Cutoff
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={course.cutoff_year3}
                                                            onChange={(ev) =>
                                                                updateAdmissionCutoffField(index, cutoffIndex, courseIndex, "cutoff_year3", ev.target.value)
                                                            }
                                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 font-semibold mb-2">
                                                            Year 4 Cutoff
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={course.cutoff_year4}
                                                            onChange={(ev) =>
                                                                updateAdmissionCutoffField(index, cutoffIndex, courseIndex, "cutoff_year4", ev.target.value)
                                                            }
                                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAdmissionCutoff(index, cutoffIndex, courseIndex)}
                                                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addAdmissionCutoff(index, cutoffIndex)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                                            >
                                                Add Course
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                                >
                                    Save Admission
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeAdmission(index, admission._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                                >
                                    Remove Admission
                                </button>
                            </form>


                        ))
                    ) : (
                        <p>No admissions Data available.</p>
                    )}
                    <button
                        onClick={addAdmission}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                    >
                        Add New Admission
                    </button>
                </div>
            </div>
        </div>
    );
}
