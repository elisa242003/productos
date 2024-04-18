"use client"

import { useEffect, useState } from "react"
import { getProduct } from "../../actions"

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export default function Page({ params }) {

 
    const [product, setProduct] = useState({});

    useEffect(() => {
      const loadNote = async () => {
        const productResult = await getProduct(params.id);

        setProduct(productResult.products)

        if(productResult.error){
          alert(productResult.error.message);
        }
      };
      loadNote();
    }, []);

  //return <div>Nota ID: {params.id} </div>

  return (
    <div>
    <p>jhgyugui</p>
    {
      !!product ? (
        <div className="max-w-[500px]">
        <ImageGallery items={product?.gallery || []}/>
        </div>
      ) : null  }
    </div>
  );
}