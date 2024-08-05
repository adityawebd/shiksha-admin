"use client"
import CollagesForm from '../../../comoponents/CollagesForm'
import Sidebar from '../../..//comoponents/Sidebar'
import React, { useEffect, useState } from 'react'
import Head from 'next/head';

export default function EditCollagePage({ params, }) {
  const [CollageInfo, setCollageInfo] = useState([]);
  const [department, setDepartment] = useState([]);
  const [admission, setAdmission] = useState([]);
  const[information, setInformation]=useState([]);


  const [Collage, setCollage] = useState({});

  const urldata = decodeURIComponent(params.editid)

  // Fetch Collage Info
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/collegeslist?name=' + urldata);
      const result = await res.json();
      if (result.success) {
        setCollageInfo(result.data);
      }
    };

    fetchData();
  }, [urldata]);

  // Fetch Department Info
  useEffect(() => {
    if (CollageInfo.name) {
      const fetchData = async () => {
        const res = await fetch(`/api/department?college=${CollageInfo.name}`);
        const result = await res.json();
        if (result.success) {
          setDepartment(result.data);
        }
      };

      fetchData();
    }
  }, [CollageInfo]);

  //Admmision data
  useEffect(() => {
    if (CollageInfo.name) {
      const fetchData = async () => {
        const res = await fetch(`/api/admission?college=${CollageInfo.name}`);
        const result = await res.json();
        if (result.success) {
          setAdmission(result.data);
        }
      };

      fetchData();
    }
  }, [CollageInfo]);

  //information 
  useEffect(() => {
    if (CollageInfo.name) {
      const fetchData = async () => {
        const res = await fetch(`/api/information?college=${CollageInfo.name}`);
        const result = await res.json();
        if (result.success) {
          setInformation(result.data);
        }
      };

      fetchData();
    }
  }, [CollageInfo]);

  // Merge Data
  useEffect(() => {
    if (CollageInfo && department) {
      const combinedData = {
        ...CollageInfo,
        department,
        admission,
        information,
        

      };
      setCollage(combinedData);
    }
  }, [CollageInfo, department,admission,information]);


  console.log('mix data is ',Collage)


  return (
    <div>
      <Head>
        <title>{`Edit College Info: ${Collage.name || 'Loading...'}`}</title>
      </Head>

      <div className="flex overflow-hidden">
        <Sidebar />
        <div className="w-full ml-36 bg-slate-800">
          <p className='ml-36 p-10 h5 text-white h1 text-2xl'>Edit college info of <b> {Collage.name} </b> </p>
          {Collage && <CollagesForm {...Collage} />}
        </div>
      </div>

    </div>
  )
}

