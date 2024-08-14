import React from 'react'
import Sidebar from '../comoponents/Sidebar'
import Notif from '../comoponents/Notif'

const page = () => {
    return (
        <div>
            <div className="flex overflow-hidden">
                <Sidebar/>
                <div className="w-10/12 ml-72">
                    <Notif/>
                    
                </div>
            </div>


        </div>
    )
}

export default page
