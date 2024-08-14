import React from 'react'
import Header from '../comoponents/Header'
import Sidebar from '../comoponents/Sidebar'
import Blogs from '../comoponents/Blogs'



export const metadata = {
    title: "Blog",

}
const page = () => {

    
    return (
        <>


            <div className="flex overflow-hidden">
                <Sidebar />
                <div className=" w-10/12 ml-72">
                    <Blogs />
                </div>

            </div>


        </>

    )
}

export default page
