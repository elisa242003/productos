"use client"
import { useState } from "react"
import { addProduct } from './actions'
import Link from "next/link";
//import { error } from "console";

export default function AddProduct(){

  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});

  //console.log(name);

  function onSave(form){
    form.preventDefault();
    let errorsList = {};
    if(!category){
      errorsList.category = 'La categoria es obligatoria';
    }

    if(!name){
      errorsList.name = 'El nombre es obligatorio';
    }

    if(!price){
      errorsList.price = 'El price es obligatorio';
    } else {
      const validPrice = price.match("^[0-9]+$");
      console.log(validPrice);
      if(!validPrice){
        errorsList.price = "el precio debe de ser un numero"
      }
    }

    if(!description){
      errorsList.description = 'La descripcion es obligatoria'

    }

    //pasar la lista de erroes 
    setErrors({...errorsList});

    if ( Object.keys(errorsList).lenght > 0 ){
      return;
    }

    //mandar a guardar el producto
    addProduct({   //se formo el producto con esos campos
      category, 
      name,
      price,
      description,
    })
      .then((result) => {
        //cuando la accion se ejecute correctamente y retorne una respuesta
        console.log(result);

        if(!result.success){
          alert(result.message);
          setErrors({...result.errors});
        } else {
          alert(result.message);
          setCategory('');
          setName('');
          setPrice('');
          setDescription('');
        }

        //hacer algo con el resultado
      })
      .catch((error) => {
        alert(error.message);
      })    

  }
  
  return(
  <div onSubmit={onSave} className="bg-pink-300 p-6 mt-6">
    <h1 className="text-black font-serif text-3xl text-center mb-8">Mi formulario</h1>
  <form method="POST">
    <div class="mb-4">
      <label htmlFor="category" class="block text-sm font-medium text-black">Categoria: </label>
      <input 
        type="text" 
        name="category" 
        value={category}
        class="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" 
        onChange={(e) => {
          setCategory(e.target.value)
          setErrors({
            ...errors,
            category: undefined,
          });
      }}/>
      <p className="text-red-500">{errors.category || ''}</p>
    </div>

    <div class="mb-4">
      <label htmlFor="name" class="block text-sm font-medium text-black">Nombre: </label>
      <input 
        type="text" 
        name="name" 
        value={name}
        class="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" 
        onChange={(e) => {
          setName(e.target.value)
          setErrors({
            ...errors,
            name: undefined,
          });
      }}/>
      <p className="text-red-500">{errors.name || ''}</p>
    </div>

    <div class="mb-4">
      <label htmlFor="price" class="block text-sm font-medium text-black">Precio: </label>
      <input 
        type="number" 
        name="price" 
        value={price}
        class="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" 
        onChange={(e) => {
          setPrice(e.target.value)
          setErrors({
            ...errors,
            price: undefined,
          });
      }}/>
      <p className="text-red-500">{errors.price || ''}</p>
    </div>

    <div class="mb-4">
      <label htmlFor="description" class="block text-sm font-medium text-black">Descripción: </label>
      <input 
        type="text" 
        name="description" 
        value={description}
        class="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" 
        onChange={(e) => {
          setDescription(e.target.value)
          setErrors({
            ...errors,
            description: undefined,
          });
      }}/>
      <p className="text-red-500">{errors.description || ''}</p>
    </div>

    <button 
      type="submit"
      class="mx-4 bg-pink-500 text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-pink-300">
      Enviar
    </button>
    <Link
      href="/products"
      className="mx-4 bg-pink-500 text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-pink-300"
    >
      Cancelar
    </Link>

  </form>
</div>


  )
}