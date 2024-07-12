import React from "react";
import Sidebar from "../comoponents/Sidebar";
import Collages from "../comoponents/Collages";

const page = () => {
  return (
    <div>
      <div className="flex overflow-hidden">
        <Sidebar />
        <div className="w-full ml-36">
        <Collages/>
        </div>
      </div>
    </div>
  );
};

export default page;
