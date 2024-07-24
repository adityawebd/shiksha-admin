"use client"
import CollagesForm from '../../../comoponents/CollagesForm'
import Sidebar from '../../..//comoponents/Sidebar'
import React, { useEffect, useState } from 'react'
import Head from 'next/head';

export default function EditCollagePage({ params, }) {

  const [CollageInfo, setCollageInfo] = useState([]);
  const urldata = decodeURIComponent(params.editid)

  // console.log(urldata)


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/collegeslist?name=' + urldata);
      const result = await res.json();
      if (result.success) {
        setCollageInfo(result.data);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Head>
        <title>{`Edit College Info: ${CollageInfo.name || 'Loading...'}`}</title>
      </Head>

      <div className="flex overflow-hidden">
        <Sidebar />
        <div className="w-full ml-36">
          <p className='ml-36 p-10 h5'>Edit college info of <b> {CollageInfo.name} </b> </p>
          {CollageInfo && (
            <CollagesForm  {...CollageInfo} />
          )}
        </div>
      </div>

    </div>
  )
}

