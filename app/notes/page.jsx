'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Notes() {
  const [notes, setNotes] = useState(null)
  const router = useRouter()

  const supabase = createClient()

  const [search, setSearch] = useState('');


 /* const { data: notes, error } = await supabase.from('notes').select() //destrocturación
    error: hay errror: true
    !error: No hay error: false
    !!error: NO NO hay error =>
    console.log(error);
*/
  useEffect(() => {
    const getData = async () => {
      const { data: {session} } = await supabase.auth.getSession()
      if(!session){
        router.push('/login')
        return
      }
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  function handleSearch(e) {
    e.preventDefault(); //impedir que se envie el form
    //para poder ejecutar una función sin recargar la pagina

    console.log("buscar: ", search);

    const getData = async () => {
      const { data } = await supabase
      .from('notes')
      .select()
      .like('title', `%${search}%`)

      setNotes(data)
    }
    getData()
  }

  return (
    <div className='my-6'>
        <h1 className='text-center text-lg font-bold text-sky-800 mb-4'>Mis notas</h1>
        <form 
          className='mb-4'
          onSubmit={handleSearch}
        >
          <input type="text"
          placeholder='Buscar..'
          className='border rounded px-2 text-black'
          defaultValue={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          />
          <button
          type='summit'
          className=''> Buscar
          </button>
          
        </form>

        {!notes || notes?.lenght == 0
        ? <p>Ninguna nota para mostrar</p> 
      : null
      }
  <ul className='font-serif mt-6 text-inherit'>
    {notes?.map((note) => 
    <li 
    key={note.id}>{note.title}
    </li>)}
  </ul>
  </div>

  );
}