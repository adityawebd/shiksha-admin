"use client"
import {  Edit, Trash2Icon } from 'lucide-react';
import React, { useState,useEffect } from 'react'


const Collages = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const res = await fetch('/api/collegeslist');
          const result = await res.json();
          if (result.success) {
            setData(result.data);
          }
        };
    
        fetchData();
      }, []);

    // const data = [
    //     {
    //         id: '01',
    //         name: 'IIT Kharagpur (IIT-KGP)',
    //         title: 'Front-end Developer',
    //         universitytype: 'Autonomous University',
    //         Estd: '1951',
    //         collageIcon: 'assets/images/college_logo.064257e359d45dd139db.webp',
    //         rating: '4.4',
    //         shortAddress: 'Kharagpur, West Bengal',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '02',
    //         name: 'IIT Bombay (IIT-B)',
    //         title: 'Full Stack Developer',
    //         universitytype: 'Autonomous University',
    //         Estd: '1958',
    //         collageIcon: 'assets/images/college_logo.bombay.webp',
    //         rating: '4.6',
    //         shortAddress: 'Mumbai, Maharashtra',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '03',
    //         name: 'IIT Delhi (IIT-D)',
    //         title: 'Data Scientist',
    //         universitytype: 'Autonomous University',
    //         Estd: '1961',
    //         collageIcon: 'assets/images/college_logo.delhi.webp',
    //         rating: '4.5',
    //         shortAddress: 'New Delhi, Delhi',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '04',
    //         name: 'IIT Madras (IIT-M)',
    //         title: 'Machine Learning Engineer',
    //         universitytype: 'Autonomous University',
    //         Estd: '1959',
    //         collageIcon: 'assets/images/college_logo.madras.webp',
    //         rating: '4.7',
    //         shortAddress: 'Chennai, Tamil Nadu',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '05',
    //         name: 'IIT Kanpur (IIT-K)',
    //         title: 'Software Engineer',
    //         universitytype: 'Autonomous University',
    //         Estd: '1959',
    //         collageIcon: 'assets/images/college_logo.kanpur.webp',
    //         rating: '4.6',
    //         shortAddress: 'Kanpur, Uttar Pradesh',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '06',
    //         name: 'IIT Roorkee (IIT-R)',
    //         title: 'Civil Engineer',
    //         universitytype: 'Autonomous University',
    //         Estd: '1847',
    //         collageIcon: 'assets/images/college_logo.roorkee.webp',
    //         rating: '4.5',
    //         shortAddress: 'Roorkee, Uttarakhand',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '07',
    //         name: 'IIT Guwahati (IIT-G)',
    //         title: 'Mechanical Engineer',
    //         universitytype: 'Autonomous University',
    //         Estd: '1994',
    //         collageIcon: 'assets/images/college_logo.guwahati.webp',
    //         rating: '4.4',
    //         shortAddress: 'Guwahati, Assam',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '08',
    //         name: 'IIT BHU Varanasi (IIT-BHU)',
    //         title: 'Electrical Engineer',
    //         universitytype: 'Autonomous University',
    //         Estd: '1919',
    //         collageIcon: 'assets/images/college_logo.bhu.webp',
    //         rating: '4.3',
    //         shortAddress: 'Varanasi, Uttar Pradesh',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '09',
    //         name: 'IIT Hyderabad (IIT-H)',
    //         title: 'Computer Scientist',
    //         universitytype: 'Autonomous University',
    //         Estd: '2008',
    //         collageIcon: 'assets/images/college_logo.hyderabad.webp',
    //         rating: '4.5',
    //         shortAddress: 'Hyderabad, Telangana',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
    //       {
    //         id: '10',
    //         name: 'IIT Indore (IIT-I)',
    //         title: 'Chemical Engineer',
    //         universitytype: 'Autonomous University',
    //         Estd: '2009',
    //         collageIcon: 'assets/images/college_logo.indore.webp',
    //         rating: '4.2',
    //         shortAddress: 'Indore, Madhya Pradesh',
    //         shortDiscriptin: 'Admission 2024, Courses, Fees, Cutoff, Placements',
    //       },
        
    //     // Add more data objects as needed
    // ];

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter data based on search term
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=' w-11/12 p-4 mb-10'>
            <div className="w-full float-left ml-32">
                {/* Search */}
                <div className="mb-4">
                    <input
                        type="search"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className='mb-4'>
                    <select className='px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300' name="" id="" onChange={(e) => setRowsPerPage(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="50">50</option>
                    </select>

                    <div className='mb-4 float-right'>
                    <a href={'/collages/newCollage'}>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Add new Collage</button>
                    </a>


                </div>


                </div>
                

                {/* Table */}
                <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                    {/* Table header */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            {/* Add more headers as needed */}
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="divide-y divide-gray-200">
                        {currentRows.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.shortAddress}</td>
                                <td className=" whitespace-nowrap  items-center justify-center">
                                    <div className='flex gap-20 items-center'>
                                    <a className='text-green-800 font-bold' href={'/collages/edit/'+item.name}><Edit/> Edit</a>

                                    <a className='text-red-900 font-bold' href={'/collages/delete/' +item.name}><Trash2Icon/>Delete</a>

                                    </div>                                    
                                </td>
                                {/* Render additional columns */}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 mb-10 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredData.length)} of {filteredData.length} entries
                        </p>
                    </div>
                    <div className="flex">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md mr-2"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastRow >= filteredData.length}
                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md"
                        >
                            Next
                        </button>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default Collages
