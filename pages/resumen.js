import useQuisco from "@/hooks/useQuisco"
import Layout from "../layout/layout"
import ResumenProducto from "@/components/ResumenProducto";
import { formatearDinero } from "@/helpers";



export default function Resumen() {

    const {pedido}=useQuisco();

    const calcularTotal=()=>{
        let total=0;
        pedido.forEach(p=>{
            total+=(p.precio*p.cantidad);
        });
        return formatearDinero(total);
        
    
    }

    return (
        <Layout pagina='Resumen'>
            <div>
                <h1 className="text-4xl font-black">Resumen</h1>
                <p className="text-2xl my-10">Revisa tu pedido</p>

                {pedido.length===0?(
                    <p className="text-center text-2xl">No hay elementos en tu pedido</p>
                ):(
                    pedido.map(p=>(
                    <ResumenProducto
                    key={p.id}
                    producto={p}
                    />  
                    ))
                )}
            </div>
           
        </Layout>
    )
}