import React from 'react'
import Sidebar from '../..//comoponents/Sidebar';
import CollagesForm from '../../comoponents/CollagesForm';


const page = () => {
  return (
    <div>
      <div className="flex overflow-hidden">
        <Sidebar/>
        <div className="w-full ml-36">
          <CollagesForm/>       
        </div>
      </div>      
    </div>
  )
}

export default page
