'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../comoponents/Sidebar';
import Notificationform from '../../../comoponents/Notificationform'
import axios from 'axios';

export default function Editnotification({params})
{
    const urldata = decodeURIComponent(params.editid)
    
    const [notificationDetails, setNotificationDetails] = useState({})

    useEffect(() => {
      const fetchData = async () => {
          const res = await fetch('/api/notification?title=' + urldata);
          const result = await res.json();
          if (result.success) {
            setNotificationDetails(result.data);
          }
      };
  
      fetchData();
  }, [urldata]);

  console.log("data sending in notification",notificationDetails)

  return(
    <div className="flex overflow-hidden">
        <Sidebar />
        <div className="w-10/12 ml-36 ">
          <p className='ml-36 p-10 h5 text-white h1 text-2xl'>Edit notification&apos;s information of <b> {notificationDetails.title} </b> </p>
          {notificationDetails && <Notificationform  notification={notificationDetails} />}
        </div>
      </div>

  )
}