"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage({ params, }) {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const name = decodeURIComponent(params.deleteid)
  useEffect(() => {
    if (!name) {
      return;
    }
    axios.get('/api/collegeslist?name=' + name).then(response => {
      setProductInfo(response.data);
    });
  }, [name]);
  function goBack() {
    router.push('/collages');
  }
  async function deleteProduct() {
    await axios.delete('/api/collegeslist?name=' + name);
    goBack();
  }

  
  return (
    <>
      <div className=''>
        <h1 className="text-center h-1">Do you really want to delete
          &nbsp;&quot;{productInfo?.name}&quot;?
        </h1>
        <div className="flex gap-2 justify-center">
          <button
            onClick={deleteProduct}
            className="btn-red">Yes</button>
          <button
            className="btn-default"
            onClick={goBack}>
            NO
          </button>
        </div>
      </div>
    </>


  );
}
