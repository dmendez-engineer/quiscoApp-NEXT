import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default async function handler(req, res) {
    const prisma=new PrismaClient();

    //Obtener Ordenes
   // if(req.method==="GET"){
        const ordenes=await prisma.orden.findMany({
            where:{
                estado:true
            }
        });
        res.status(200).json(ordenes);
   // }


}