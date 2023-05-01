import axios from "axios";
import { useRouter } from "next/router";
import {useState,useEffect,createContext}from "react"
import { toast } from "react-toastify";


const QuiscoContext=createContext();

const QuiscoProvider =({children})=>{

    const [categorias,setCategorias]=useState([]);
    const [categoriaActual,setCategoriaActual]=useState({});
    const [producto,setProducto]=useState({});
    const [modal,setModal]=useState(false);
    const [pedido,setPedido]=useState([]);
    const[pedidoEditar,setPedidoEditar]=useState({});
    const [nombre,setNombre]=useState('');
    const [total,setTotal]=useState(0);
    const router=useRouter();

    const obtenerCategorias=async ()=>{
        const url=`/api/categorias`;
        
        try{
            const {data}= await axios(url);
            setCategorias(data);

        }catch(error){
            console.log("ERROR: ",error);
        }

        
    }
    const handleClickCategoria=(id)=>{

       // const categoria=categorias.filter(c=>(c.id==id));
        const categoria=categorias.filter(c=>{return c.id==id});
        setCategoriaActual(categoria[0]);
        router.push("/");
    }
    const handleSetProducto=(productoAgregar)=>{
        setProducto(productoAgregar);
    }
    const handleModal=()=>{
        setModal(!modal);
    }
    
    const handleAgregarPedido=({categoriaId,...pedidoNuevo})=>{
       
       if(pedido.some((p)=>p.id===pedidoNuevo.id)){
            
            const pedidoActualizado=pedido.map(p=>p.id===pedidoNuevo.id?pedidoNuevo:p);
            setPedido(pedidoActualizado);
            toast.success('Guardado correctamente');
       }else{
        setPedido([...pedido,pedidoNuevo]);
        toast.success('Agregado al Pedido');
       }

        
       setModal(false);
        
    }
    useEffect(()=>{
        obtenerCategorias();
        
    },[]);
    
    useEffect(()=>{
        setCategoriaActual(categorias[0]);
    },[categorias]);


    const handleEditarCantidad=(id)=>{
        const pedidoEditar=pedido.filter(p=>p.id===id);
        setProducto(pedidoEditar[0]);
        setModal(!modal);
    }

    const handleEliminarProducto=(id)=>{
        const pedidoActualizado=pedido.filter(p=>p.id!==id);
       if(confirm("Desea eliminar el producto?")){
        setPedido(pedidoActualizado);
       }else{
        return;
       }
        
    }
    useEffect(()=>{
        const nuevoTotal=pedido.reduce((total,producto)=>(producto.precio * producto.cantidad)+total,0);
        setTotal(nuevoTotal);
    },[pedido]);

    const colocarOrden= async (e)=>{
        e.preventDefault();
        const url=`/api/ordenes`;
        try{
            console.log("DATOS:",nombre,total,pedido);
            const {data}=await axios.post('/api/ordenes',{
                pedido:pedido,
                nombre:nombre,
                total:total,
                fecha:Date.now().toString()
            });
          //  console.log(data);

          //Resetar app
          setCategoriaActual(categorias[0]);
          setPedido([]);
          setNombre('');
          setTotal('');
          toast.success("Pedido realizado correctamente");

          setTimeout(() => {
            router.push("/");
          }, 1500);
          

        }catch(error){
            console.log("ERROR: ",error);
        }
    }

    return (
        <QuiscoContext.Provider
        value={{
            categorias:categorias,
            handleClickCategoria:handleClickCategoria,
            categoriaActual:categoriaActual,
            handleSetProducto:handleSetProducto,
            producto:producto,
            modal:modal,
            handleModal:handleModal,
            handleAgregarPedido:handleAgregarPedido,
            pedido:pedido,
            handleEditarCantidad:handleEditarCantidad,
            handleEliminarProducto:handleEliminarProducto,
            setNombre:setNombre,
            nombre:nombre,
            colocarOrden:colocarOrden,
            total:total
   
        }}>
        {children}
            
        </QuiscoContext.Provider>
    )
}
export {
    QuiscoProvider
}
export default QuiscoContext