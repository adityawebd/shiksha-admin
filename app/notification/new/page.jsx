import React from 'react'
import Sidebar from '../../comoponents/Sidebar';
import NotificationForm from '../../comoponents/Notificationform'


const page = () => {
  return (
    <div>
      <div className="flex overflow-hidden">
        <Sidebar/>
        <div className="w-full ml-64">
         <NotificationForm/> 
        </div>
      </div>      
    </div>
  )
}

export default page
