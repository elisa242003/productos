'use client'

import { filtProducts, getProducts, searchProducts} from './actions';
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Slider from '@/components/slider';
import { useRouter } from 'next/navigation'



export default function Products() {
  const [prod, setProd] = useState(null);
  const supabase = createClient();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const router = useRouter()

  function handleSearch(e) {
    e.preventDefault();
    const getData = async () => {
      const productsResult = await searchProducts(search);
      setProd(productsResult.products);
        if(productsResult.error){
          alert(productsResult.error.message);
        }
    }
    getData()
  }

  useEffect(() => {
    const getData = async () => {
      const { data: {session} } = await supabase.auth.getSession()
      if(!session){
        router.push('/login')
        return
      }
      const productsResult = await getProducts();
      setProd (productsResult.products);

      if(productsResult.error){
        alert(productsResult.error.message);
      }
    }
    getData()
  }, []);

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
  }, []);

  const productCard = (product) => ( 
    <div
      key={product.id}
      className="p-4 bg-pink-400 border border-1 mr-4 mb-4 inline-block text-black" // Agrega margen derecho y margen inferior
      style={{ whiteSpace: 'nowrap' }} // Evita saltos de línea en el contenido del texto
    >
      <p>{product.category}</p>

      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 relative w-1/2">
      <h1 className='text-center text-4xl font-bold text-pink-600 mb-4 font-mono col-span-3'>My Products</h1>
      <form className='mb-4 col-span-3 flex items-center justify-center' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder='Buscar..'
          className='border rounded px-2 text-black'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          type='submit'
          className='bg-gray-300 rounded px-4 text-black ml-2' 
        >
          Buscar
        </button>
        <button
          className="bg-gray-300 rounded px-4 text-black ml-2"
        >
          <a href="/products/add">Agregar</a>
        </button>
         
        <label htmlFor="categorySelect">Select a category:</label>
      <select
        id="categorySelect"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className='border rounded px-2 text-black ml-2'
      >
        <option value="">All Categories</option>
        <option value="Lipstick">Lipstick</option>
        <option value="Blush">Blush</option>
        <option value="Highlighter">Highlighter</option>
        <option value="Concealer">Concealer</option>
      </select>

      </form>
      {!prod || prod?.length === 0 ? <p className="col-span-3 text-center">No products to display</p> : null}

      <div className="py-14 px-4 block w-full">
      <h1>Ejemplo</h1>

      <Slider
        height={120}
        itemWidth={200} // Ajusta el ancho de los elementos según la cantidad de información que desees mostrar
        items={products.map((product) => productCard(product))}
        className="mt-10"
      />
    </div> 
  
      {prod && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 col-span-3">
          {prod.map((product) => (
            (selectedCategory === '' || product.category === selectedCategory) && (
            <div key={product.id} className='flex flex-col bg-pink-300 p-4 border border-gray-200 rounded-md relative'>
              <strong className='text-black text-lg'>{product.name}</strong>
              <p className='text-black mb-2'>Categoría: {product.category}</p>
              <p className='text-black font-bold mb-2'>Precio: ${product.price}</p>
              <p className='text-black'>Descripción: {product.description}</p>
              <div className="mb-2"></div>
              <div className="flex justify-between">
                <Link
                  className="bg-pink-500 text-black p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-pink-300"
                  href={`/products/edit/${product.id}`}>
                  Editar
                </Link>
                <Link
                  className="bg-blue-500 text-black p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-pink-300 ml-2"
                  href={`/products/img/${product.id}`}>
                  Galeria
                </Link>
              </div>
            </div>
            )
          ))}
        </div>
      )}
    </div>
  );
  
  
}




