import React from 'react'
import Header from '../comoponents/Header'
import Sidebar from '../comoponents/Sidebar'
import Leads from '../comoponents/Leads'

const page = () => {
  return (
    <div>
        
        <div className="flex overflow-hidden">
                <Sidebar />
                <div className=" w-11/12 ml-36">
                <Leads/>
                    
                </div>

            </div>

        
      
    </div>
  )
}

export default page
