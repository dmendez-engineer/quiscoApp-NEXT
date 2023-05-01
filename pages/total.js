import { formatearDinero } from "@/helpers";
import useQuisco from "@/hooks/useQuisco"
import Layout from "@/layout/layout"
import { useState,useEffect,useCallback } from "react"



export default function Total() {

    
    const {pedido,nombre,setNombre,colocarOrden,total}=useQuisco();
    
     
   
   const comprobarPedido=useCallback(()=>{
        return pedido.length===0 || nombre==="" || nombre.length<3;
    },[pedido,nombre]);

    /*const comprobarPedido=()=>{
        return pedido.length===0 || nombre==="" || nombre.length<3;
    }*/

    useEffect(()=>{
        comprobarPedido();

       // return pedido.length===0 || nombre==="" || nombre.length<3;
    },[pedido,comprobarPedido]);

    

    return (
        <Layout pagina='Total'>
            
                <h1 className="text-4xl font-black">Datos y Total</h1>
                <p className="text-2xl my-10">Confirma tu pedido a continuación</p>
                <form
                onSubmit={(e)=>colocarOrden(e)}
                >
                    <div>
                        <label className="block uppercase text-slate-800 font-bold text-xl" htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        />

                    </div>
                    <div className="mt-10">
                        <p className="text-2xl">Total a pagar {``} <span className="font-bold">{formatearDinero(total)}</span></p>
                    </div>

                    <div className="mt-5">
                        <input type="submit" value="Confirmar pedido"
                        disabled={comprobarPedido()}
                        className={`${comprobarPedido()?'bg-indigo-100':'bg-blue-400 hover:bg-indigo-800'} px-3 py-2  w-full lg:w-auto text-white uppercase rounded-md font-bold`}
                        />
                    </div>
                </form>
        </Layout>
    )

}