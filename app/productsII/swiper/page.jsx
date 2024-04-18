"use client"

export default function SwiperPage(){

  const content = (product, index) => ( 
    //const left = index > 0  ? (index * 170) : 0;
    
    <div
    key={product.id}
    className="p-4 h-[120px] w-[150px] bg-pink-200 border border-1 absolute"
    style={{ left: `${index * 170}px`}}
    >
      <p>{product.name} </p>
    </div>
  
  )

  const products = [
    {id: '1', name: 'Product1'},
    {id: '2', name: 'Product2'},
    {id: '3', name: 'Product3'},
    {id: '4', name: 'Product4'}
  ];


  return(
    <div className="py-14 px-4 block w-full">
      <h1>Ejemplo</h1>
      <div className="text-black overflow-x-auto relative w-full h-[120px]">
        {products.map((product, index)=> {
          return content(product, index);
        })}
      </div>
    </div>
  );
}