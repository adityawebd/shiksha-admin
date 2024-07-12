import React from 'react'
import Sidebar from '../comoponents/Sidebar'
import NewBlogs from '../comoponents/NewBlogs'


export const metadata={
    title: "New Blog",

}

const page = () => {
    
    return (
        <div className='flex overflow-hidden'>
            <Sidebar />
            <div className='ml-36 '>
            <NewBlogs/>  

            </div>
                      
        </div>
    )
}

export default page
