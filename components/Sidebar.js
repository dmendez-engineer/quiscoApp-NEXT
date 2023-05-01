import React from 'react'
import Image from "next/image"
import useQuisco from '../hooks/useQuisco'
import Categoria from '../components/Categoria';

const Sidebar = () => {
  
    const {categorias}=useQuisco();
    
    return (
    <>
        <Image width={300} height={100} src="/assets/img/logo.svg" alt="Imagen logotipo"/>

        <nav className='mt-10'>
            {categorias.map(c=>(
                <Categoria
                key={c.id}
                categoria={c}
                />
            ))}
        </nav>

    </>
  )
}

export default Sidebar