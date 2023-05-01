import { formatearDinero } from '@/helpers'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'

function Orden({orden}) {
 
    const {id,nombre,total,pedido}=orden
    
    const completarOrden= async ()=>{
        try{
           const ordenActualizada= await axios.post(`/api/ordenes/${id}`);
            toast.success("Orden lista");
        }catch(error){
            console.log("ERROR: ",error);
            toast.error("Hubo un error");
        }
    }
    
    return (
    <div className='border p-10 space-y-5'>
        <h1 className="text-2xl font-bold">Orden: #{id}</h1>
        <p className="text-lg font-bold">Cliente: {nombre}</p>
        
        <div>
            {pedido.map(platillo=>(
                <div key={platillo.id}
                className='py-3 flex border-b last-of-type:border-0 items-center'
                >
                    <div className='w-32'>
                        <Image alt='Imagen' width={400} height={500} src={`/assets/img/${platillo.imagen}.jpg`}/>
                    </div>
                    <div className='p-5 space-y-2'>
                        <h4 className='text-xl font-bold text-amber-500'>{platillo.nombre}</h4>
                        <p className='text-lg font-bold'>Cantidad: {platillo.cantidad}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className='md:flex md:items-center md:justify-between my-10'>
                <p className='mt-5 font-black text-4xl text-amber-500'>
                    Total a pagar: {formatearDinero(total)}
                </p>
                <button className='p-3 bg-indigo-600 text-white font-bold mt-5 md:mt-0 py-3 px-10 uppercase  rounded-md hover:bg-indigo-700' 
                type='button'
                onClick={()=>completarOrden()}
                >
                    Despachar orden
                </button>
        </div>

    </div>
  )
}

export default Orden