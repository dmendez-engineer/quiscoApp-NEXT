import useQuisco from '../hooks/useQuisco'
import { useRouter } from 'next/router'
import React from 'react'

const pasos=[
    {paso:1,nombre:'Menú',url:'/'},
    {paso:2,nombre:'Resumen',url:'/resumen'},
    {paso:3,nombre:'Total',url:'/total'}
]

const Pasos = () => {


    const calcularProgreso=()=>{
       
        let valor;
        if(router.pathname==='/'){
            valor=2
        }else if(router.pathname==='/resumen'){
            valor=50;
        }else{
            valor=100;
        }
        return valor;
    }
    const router=useRouter();
  
    return (
    <div>
        <div className='flex justify-between mb-10'>
            {pasos.map(paso=>(
                <button key={paso.paso}
                className='py-3 px-5 bg-indigo-400 hover:bg-indigo-600 text-white border uppercase font-bold rounded-md'
                onClick={()=>{
                    router.push(paso.url);
               
                }}
                >
                    {paso.nombre}
                </button>
            ))}
        </div>
        <div className='bg-gray-100 mb-10'>
                <div className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white' style={{width:`${calcularProgreso()}%`}}>
                </div>
        </div>
    </div>
  )
}

export default Pasos