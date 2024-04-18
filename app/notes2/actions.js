"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

function supabaseClient(){
  const cookieStore = cookies();
  return createClient(cookieStore);
}

export async function getNotes(){

  const {data: notes, error} = await supabaseClient() //llamar directamente a la función
  .from('notes')
  .select();

  return{
    notes,
    error,
  };
}

//función para buscar/filtrar
export async function searchNotes(search){

  //conservar instancia de supabase (utilizar el cliente las veces que sea necesario)
  const supabase = supabaseClient();

  const { data: notes, error } = await supabase
  .from('notes')
  .select()
  .like('title', `%${search}%`)

  return{
    notes,
    error,
  };
}

//función para leer una nota por id
export async function getNote(id){
  const supabase = supabaseClient();

  const { data, error} = await supabase
  .from('notes')
  .select()
  .eq('id', id)
  .single();

  return({
    notes: data,
    error,
  });
}

