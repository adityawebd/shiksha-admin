"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page({params}) {
//   const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const titlee = decodeURIComponent(params.delete);
  useEffect(() => {
    if (!titlee) {
      return;
    }
    axios.get("/api/notification?title=" + titlee).then((response) => {
      setProductInfo(response.data);
    });
  }, [titlee]);
  function goBack() {
    window.location.replace('/notification')
  }
  async function deleteProduct() {
    await axios.delete("/api/notification?title=" + titlee);
    goBack();
  }
  return (
    <>
      <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="bg-red-400 w-11 rounded-xl">
          Yes
        </button>
        <button className="bg-blue-400 w-11 rounded-xl" onClick={goBack}>
          NO
        </button>
      </div>
    </>
  );
}
