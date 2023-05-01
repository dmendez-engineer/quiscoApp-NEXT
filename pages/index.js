import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import Layout from '../layout/layout'
import useQuisco from '../hooks/useQuisco'
import Producto from '../components/Producto'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const {categoriaActual}=useQuisco();


  return (
   <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
      <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1>
      <p className='text-2xl my-10'>
      Elige y personaliza tu pedido a continuación
      </p>
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {categoriaActual?.productos?.map(p=>{
        return <Producto
        key={p.id}
        producto={p}
        />
      })}
      </div>
     
   </Layout>
  )
}
/*
export const getServerSideProps=async()=>{
  const prisma= new PrismaClient();
  const url="http://localhost:3000/api/categorias";//Desde un api, ver archivo api/categorias => eso es la url del api, 
                                                  //cada archivo como lo nombre dentro de la carpeta de api, así será en la url
 const categorias= await prisma.producto.findMany();
 const categorias= await prisma.categoria.findFirst({
    where:{
      id:3
    }
  });

  console.log(categorias);
return {
  props:{
    categorias:categorias
  }
}
  


}
*/