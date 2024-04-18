"use client"

import { useEffect, useState } from "react";
import { getProduct } from "../../actions";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Link from "next/link";

export default function Page({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productResult = await getProduct(params.id);
        if (productResult.error) {
          alert(productResult.error.message);
        } else {
          setProduct(productResult.products);
        }
      } catch (error) {
        console.error("Error loading product:", error);
        alert("Error loading product");
      }
    };
    loadProduct();
  }, [params.id]);

  return (
    <div>
      <p className="text-3xl font-serif">
        Galería de productos de{" "}
        <span className="text-pink-500 font-serif">{product && product.name}</span>
      </p>
      
      <div className="flex justify-end">
        <Link
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-pink-300 ml-2"
          href={`/products`}>
          Cerrar
        </Link>
      </div>
      {product && (
        <div className="max-w-[500px]">
          <ImageGallery items={product.gallery || []} />
        </div>
      )}
    </div>
  );
}




/*"use client"

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
}*/