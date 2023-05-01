import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const prisma=new PrismaClient();

export default async function handler(req, res) {
  const categorias= await prisma.categoria.findMany({
    include:{
      productos:true
    }
  });
  
  res.status(200).json(categorias);
}
