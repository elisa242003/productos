import Image from "next/image";
import Slider, { Slidersito } from "../../../components/slider";
import IMG from "./twitter-image.png";
const ProductCard = ({product}) => ( 
  <div
    key={product.id}
    className="p-4 bg-pink-200 border border-1"
    style={{ marginRight: '20px',width:1000 }} // Añade un margen derecho de 20px para separar las tarjetas
  >
    <p>{product.name}</p>
  </div>
);

export default function SliderPage(){

  const products = [
    {id: '1', name: 'Product1'},
    {id: '2', name: 'Product2'},
    {id: '3', name: 'Product3'},
    {id: '4', name: 'Product4'}, 
    {id: '5', name: 'Product5'},
    {id: '6', name: 'Product6'},
    {id: '7', name: 'Product7'},
    {id: '8', name: 'Product8'}
  ];

  return(
    <div className="py-14 px-4 block w-full">
      <h1>Ejemplo</h1>

      <Slider
        height={120}
        itemWidth={170} // Aumenta el ancho del item para incluir el margen entre las tarjetas
        items={products.map((product) =><ProductCard product={product}></ProductCard>)}
        className="mt-10 text-black overflow-x-auto relative w-full h-[120px] mx-4"
      />

      
      <Slider
        height={120}
        itemWidth={170} // Aumenta el ancho del item para incluir el margen entre las tarjetas
        items={products.map((product) => <ProductCard product={product}></ProductCard>)}
        className= "mt-2 mx-4 text-black overflow-x-auto relative w-full h-[120px]"
      />
      <Slidersito width={500}>
        <Image src={IMG} height={500}></Image>
        <Image src={IMG} height={500}></Image>
        <Image src={IMG} height={500}></Image>
        <Image src={IMG} height={500}></Image>
        <Image src={IMG} height={500}></Image>
        <Image src={IMG} height={500}></Image>
      </Slidersito>
    </div>
  );
}
