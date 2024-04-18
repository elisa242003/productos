"use client"

import { useEffect, useState } from "react"
import { getNote } from"../../actions";

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export default function Page({ params }) {

 
    const [note, setNote] = useState({});

    useEffect(() => {
      const loadNote = async () => {
        const noteResult = await getNote(params.id);

        setNote(noteResult.notes)

        if(noteResult.error){
          alert(noteResult.error.message);
        }
      };
      loadNote();
    }, []);

  //return <div>Nota ID: {params.id} </div>

  return (
    <div>
    <p>jhgyugui</p>
    {
      !!note ? (
        <div className="max-w-[500px]">
        <ImageGallery items={note?.gallery || []}/>
        </div>
      ) : null  }
    </div>
  );
}