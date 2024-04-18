'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import { getProducts, searchProducts } from './actions';
import Link from 'next/link';
//import { addProduct } from './add/actions';

export default function Products() {
  const [prod, setProd] = useState(null);
  const supabase = createClient();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const getData = async () => {
      const productsResult = await getProducts();
      setProd (productsResult.products);

      if(productsResult.error){
        alert(productsResult.error.message);
      }
    } 
    getData()
  }, [])

  /*useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('products').select();
      setProd(data);
    };
    getData();
  }, []);*/

/*async function handleSearch(e) {
  e.preventDefault();

  const { data } = await query;
  let query = supabase
    .from('products')
    .select()
    .like('name', `%${search}%`);
    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }
  setProd(data);
}*/

function handleSearch(e) {
  e.preventDefault(); 
  const getData = async () => {
    const productsResult = await searchProducts(search);
    setNotes(productsResult.products);
    if(productsResult.error){
      alert(productsResult.error.message);
    }         
  }
  getData()
}
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
   
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className='border rounded px-2 text-black ml-2'>
    <option value="">All Categories</option>
    <option value="Lipstick">Lipstick</option>
    <option value="Blush">Blush</option>
    <option value="Highlighter">Highlighter</option>
    <option value="Concealer">Concealer</option>
  </select>
</form>
      {!prod || prod?.length === 0 ? <p className="col-span-3 text-center">No products to display</p> : null}

      {prod && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 col-span-3">
          {prod.map((product) => (
            (selectedCategory === '' || product.category === selectedCategory) && (
            <div key={product.id} className='flex flex-col h-full bg-rose-200 p-4 border border-gray-200 rounded-md'>
              <strong className='text-black text-lg'>{product.name}</strong>
              <p className='text-gray-700 mb-2'>Categoría: {product.category}</p>
              <p className='text-green-600 font-bold mb-2'>Precio: ${product.price}</p>
              <p className='text-gray-600'>Descripción: {product.description}</p>

              <Link
                className="bg-pink-500 text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-pink-300"
                href={`/productsII/edit/${product.id}`}>
                Editar
              </Link>
            </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}



