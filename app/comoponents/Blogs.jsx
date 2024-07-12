import React from 'react'


const Blogs = () => {
    const blog = [
        {
            id: '01',
            author: 'John Doe',
            title: 'Front-end Developer',
            cardImg:
                'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
        },
        {
            id: '02',
            author: 'Jane Doe',
            title: 'Back-end Developer',
            cardImg:
                'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        },
    ]
    return (
       
            <section className="w-11/12 float-right p-5">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Blogs</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            This is a list of all Blogs. You can add new Blogs, edit or delete existing
                            ones.
                        </p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            <a href='/newblog'> Add new Blog </a>
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                <span>ID</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                <span>Card Image</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Title
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Author
                                            </th>

                                            {/* <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        
                                                    </th> */}
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                                                <span >Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {blog.map((blogs) => (
                                            <tr key={blogs.id} className="divide-x divide-gray-200">
                                                <td className='px-6'>
                                                    <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                                                        {blogs.id}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="flex">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={blogs.cardImg}
                                                                alt=""
                                                            />
                                                        </div>

                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="text-sm text-gray-900">{blogs.title}</div>

                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                        {blogs.author}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium ">
                                                    <a href="#" className="text-gray-500 hover:text-indigo-600 float-left">
                                                        Edit
                                                    </a>

                                                    <a href="#" className=" text-red-600 hover:text-red-900 float-right">
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full border-gray-300">
                    <div className="mt-2 flex items-center justify-end">
                        <div className="space-x-2">
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                &larr; Previous
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Next &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </section>

       
    )
}

export default Blogs
