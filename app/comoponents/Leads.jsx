"use client"
import { Edit, Trash2Icon } from 'lucide-react';
import React, { useState, useEffect } from 'react'

const Leads = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/contact');
            const result = await res.json();
            if (result.success) {
                setData(result.data);
            }
        };

        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

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

    // Function to convert JSON data to CSV format
    const exportAsCSV = () => {
        const csvRows = [];
        const headers = ['Name', 'Email', 'Contact', 'Message', 'Date', 'Date', 'Year'];
        csvRows.push(headers.join(','));

        filteredData.forEach(item => {
            const row = [
                item.name,
                item.email,
                item.phone,
                `"${item.message}"`, // Enclose message in quotes to handle commas
                formatDate(item.createdAt)
            ];
            csvRows.push(row.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'leads.csv');
        a.click();
    };

    return (
        <div className='w-11/12 p-4 mb-10'>
            <div className="w-full float-left ml-32">
                {/* Search */}
                <div className="mb-4 w-full">
                    <input
                        type="search"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
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

                {/* Export as CSV Button */}
                <div className="mb-4">
                    <button
                        onClick={exportAsCSV}
                        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Export as CSV
                    </button>
                </div>

                {/* Table */}
                <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                    {/* Table header */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="divide-y divide-gray-200">
                        {currentRows.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="w-60 h-40 overflow-y-auto ">
                                        <p className='w-2/5'>
                                        {item.message}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.createdAt)}</td>
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

export default Leads
