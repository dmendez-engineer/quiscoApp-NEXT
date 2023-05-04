import AdminLayout from "@/components/AdminLayout"
import Orden from "@/components/Orden";
import OrdenesCompletadas from "@/components/OrdenesCompletadas";
import axios from "axios";
import { cookies } from "next/dist/client/components/headers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from 'swr'

export default function Admin(){
    const router=useRouter();
    const [ordenDespachada,setOrdenDespachada]=useState(false);
    
    const verOrdenDespchada=()=>{
        setOrdenDespachada(!ordenDespachada);
    }
    const fetcher=()=>{
        return axios.get('/api/ordenes').then(datos=>{
             return datos.data;
         });
     }
    
     const fetcherDespacho=()=>{
        return axios.get('/api/ordenesDespachadas').then(datos=>{
             return datos.data;
         });
     }
    


    const {data,error,isLoading}=useSWR('/api/ordenes',ordenDespachada===false?fetcher:fetcherDespacho  ,{refreshInterval:100});

   // console.log("DATOS ORDENES: ",data);

    return (
       <AdminLayout pagina={'Admin'}>
        <h1 className="text-4xl font-black">Panel de administración</h1>
        <p className="text-2xl my-10">Administra las ordenes</p>
        <button
                className='py-3 px-5 mb-10 bg-indigo-400 hover:bg-indigo-600 text-white border uppercase font-bold rounded-md'
                onClick={()=>verOrdenDespchada()}
                >
                
                    {ordenDespachada===false?'Ver ordenes sin despachar':'Ver ordenes despachadas'}
                </button>
            
            {data && data.length ? data.map(orden=>(
                <Orden
                key={orden.id}
                orden={orden}
                ordenDespachada={ordenDespachada}
                />
            ))  : <p>No hay ordenes</p>}
        </AdminLayout>
    )
}