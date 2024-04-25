"use client"
import { useEffect, useState } from 'react';
import Slider from "../../../components/slider";
import { createClient } from '@/utils/supabase/client';


export default function SliderPage(){

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient(); // Crear el cliente Supabase
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          throw error;
        }
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    }

    fetchProducts();
  }, []); // Este efecto se ejecutará solo una vez al cargar el componente

  const productCard = (product) => ( 
    <div
      key={product.id}
      className="p-4 bg-pink-500 border border-1 mr-4 mb-4 inline-block text-black" // Agrega margen derecho y margen inferior
      style={{ whiteSpace: 'nowrap' }} // Evita saltos de línea en el contenido del texto
    >
      <p>{product.category}</p>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );

  return(
    <div className="py-14 px-4 block w-full">

      <Slider
        height={120}
        itemWidth={500} // Ajusta el ancho de los elementos según la cantidad de información que desees mostrar
        items={products.map((product) => productCard(product))}
        className="mt-10"
      />
    </div>
  );
}
