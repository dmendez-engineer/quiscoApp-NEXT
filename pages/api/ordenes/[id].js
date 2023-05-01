import { PrismaClient } from "@prisma/client";


export default async function handler(req,res){
    const prisma= new PrismaClient();
    if(req.method==='POST'){
        //console.log(req.query.id);//Como se nombre en el routing dinamica y como se nombra la variable que pasa en el template string en Orden.js es como se obtiene
       const {id}=req.query
        
       const ordenActualizada=await prisma.orden.update({
        where:{
            id:parseInt(id)
        },
        data:{
            estado:true
        }
       });
       res.status(200).json(ordenActualizada);

    }
}