"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

function supabaseClient(){
  const cookieStore = cookies();
  return createClient(cookieStore);
}

export async function getProducts(){

  const {data: products, error} = await supabaseClient() //llamar directamente a la función
  .from('products')
  .select();

  return{
    products,
    error,
  };
}

//función para buscar/filtrar
export async function searchProducts(search){

  //conservar instancia de supabase (utilizar el cliente las veces que sea necesario)
  const supabase = supabaseClient();

  const { data: products, error } = await supabase
  .from('products')
  .select()
  .like('name', `%${search}%`)

  return{
    products,
    error,
  };
}

//función para leer una nota por id
export async function getProduct(id){
  const supabase = supabaseClient();

  const { data, error} = await supabase
  .from('products')
  .select()
  .eq('id', id)
  .single();

  return({
    products: data,
    error,
  });
}