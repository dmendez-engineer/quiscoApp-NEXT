import AdminLayout from "@/components/AdminLayout"
import Orden from "@/components/Orden";
import axios from "axios";
import { cookies } from "next/dist/client/components/headers";
import useSWR from 'swr'

export default function Admin(){

    const fetcher=()=>{
       return axios.get('/api/ordenes').then(datos=>{
            return datos.data;
        });
    }

    const {data,error,isLoading}=useSWR('/api/ordenes',fetcher,{refreshInterval:100});

   // console.log("DATOS ORDENES: ",data);
    return (
       <AdminLayout pagina={'Admin'}>
        <h1 className="text-4xl font-black">Panel de administración</h1>
        <p className="text-2xl my-10">Administra las ordenes</p>
            
            {data && data.length ? data.map(orden=>(
                <Orden
                key={orden.id}
                orden={orden}
                />
            ))  : <p>No hay ordenes pendientes</p>}
        </AdminLayout>
    )
}