'use client'

import { useEffect } from "react";
import './slider.css'

export default function Slider({
  height,
  itemWidth,
  items,
  className,
}){

  const renderItem =( child, index)=> (
      <div
      id="tar"
      key = {index}
      className="h-full absolute"
      style={{left: `${index * itemWidth}px`, width: `${itemWidth}px!important`}}
      >
          {child}
      </div>
  )

  return(
    <div className={`${className} w-full block`}>
      <div
      className="overflow-x-auto w-full relative mySlider"
      style={{height: `${height}px`}}
      >
       {items.map ((item, index)=> {
             return renderItem (item, index);
         })}
         </div> 
    </div>
    )

}

export const Slidersito = ({
  width,
  children,
}) => {
  
  useEffect(() => {
    const div = document.getElementById('divvvv')
    let scr = 0
    const interv = setInterval(()=>{
      scr += width
      div.scroll(scr,0)
      console.log('estaaa vivoo')
    },1000)
    return () => {
      clearInterval(interv)
    };
  }, []);
  return (
    <div className="block absolute" style={{width: `${width}px`,display:"block"}}>
    <div className="overflow-x-auto flex flex-row gap-2 transition duration-100 ease-in-out transition-all" id="divvvv" style={{overflowX:"scroll"}}>
      {children}
    </div>
    </div>
  );
}
