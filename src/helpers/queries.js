// aqui van estar las consultas al back, si necesito asm consultas creo mas archivos dentro de esta carpeta
const urlServicios = import.meta.env.VITE_SERVICIO;

export const listarProductosApi = async() => {
    try{
        const respuesta = await fetch(urlServicios) // espera la respuesta del fetch 
        return respuesta 
    }catch(error){
        console.error(error)
    }
}