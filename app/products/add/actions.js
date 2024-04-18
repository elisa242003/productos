"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


/**
*funcion para registrar un nuevo producto
* @param {* peoduct} datos del producto
*/

export async function addProduct(product){

let errorsList = {};
if(!product.category){
  errorsList.category = 'La categoria es obligatoria';
}

if(!product.name){
  errorsList.name = 'El nombre es obligatorio';

}

if(!product.price){
  errorsList.price = 'El price es obligatorio';
} else {
  if(!product.price.match("^[0-9]+$")){
    errorsList.price = "el precio debe de ser un numero"
  }
}

if(!product.description){
  errorsList.description = 'La descripcion es obligatoria'
}

if ( Object.keys(errorsList).lenght > 0 ){
  return{
    success: false,
    message: 'Los datos son incorrectos, vuelve a intentar',
    errors: errorsList,
  };
}

const cookieStore = cookies()
const supabase = createClient(cookieStore)

const { data, error } = await supabase
  .from('products')
  .insert([
    product,
  ])
  .select()

  if(error){
    return{
      success: false,
      message: `Ocurrio un error al guardar el producto.
      Error: ${error.message}`,
      errors: errorsList,
    };
  }
          
return{
  success: true,
  message: 'Registro exitoso',
  errors: null,
};

}