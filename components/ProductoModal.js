import { formatearDinero } from '@/helpers';
import useQuisco from '@/hooks/useQuisco'
import Image from 'next/image';
import {React,useState,useEffect} from 'react'

function ProductoModal() {
  
  const {handleModal,producto,handleAgregarPedido,pedido}=useQuisco();
   
    const [cantidad,setCantidad]=useState(1);
    const [edicion,setEdicion]=useState(false);
    
    /*const validarCantidad=()=>{
        pedido.forEach(p=>{
            if(p.id===producto.id){
                setCantidad(p.cantidad);
            }
        });
    }
    useEffect(()=>{
        validarCantidad();
    },[pedido]);*/

    useEffect(()=>{
        
        if(pedido.some(p=>p.id===producto.id)){
            const pedidoEdicion=pedido.find(p=>p.id===producto.id);
            setEdicion(true);
            setCantidad(pedidoEdicion.cantidad);
        }


    },[pedido,producto]);

    
  return (
    <div className='md:flex gap-10'>
        <div className='md:w-1/3'>
            <Image
            width={300} height={400}
            alt="Imagen producto"
            src={`/assets/img/${producto.imagen}.jpg`}
            />
        </div>
        
        <div className='md:w-2/3'>
            <div className='flex justify-end'>
                <button onClick={()=>handleModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                </button>
            </div>
            <h1 className='text-3xl font-bold mt-5'>{producto.nombre}</h1>
            <p className='mt-5 font-black text-5xl text-amber-500'>{formatearDinero(producto.precio)}</p>

            <div className='flex gap-5 mt-10'>
                <button
                type='button'
                onClick={cantidad==1?()=>{return;}:()=>setCantidad(cantidad-1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                    <p className='text-3xl'>{cantidad}</p>

                <button
                type='button'
                onClick={()=>{
                    if(cantidad>=5){
                        return;
                    }else{
                        setCantidad(cantidad+1);
                    }

                }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <button type='button' 
            className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-md'
            onClick={()=>handleAgregarPedido({
                ...producto,
                cantidad
            })}
            
            >{edicion ? 'Guardar Cambios' : 'Agregar Producto'}</button>
        </div>
    
    
    </div>
  )
}

export default ProductoModal