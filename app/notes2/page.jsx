'use client'

import { getNotes, searchNotes } from './actions';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState(null)

  const [search, setSearch] = useState('');

  function handleSearch(e) {
    e.preventDefault(); 
    const getData = async () => {
      const notesResult = await searchNotes(search);
      setNotes(notesResult.notes);
      if(notesResult.error){
        alert(notesResult.error.message);
      }         
    }
    getData()
  }

  useEffect(() => {
    const getData = async () => {
      const notesResult = await getNotes();
      setNotes (notesResult.notes);

      if(notesResult.error){
        alert(notesResult.error.message);
      }
    } 
    getData()
  }, [])


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

