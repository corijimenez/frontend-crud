// aqui van estar las consultas al back, si necesito asm consultas creo mas archivos dentro de esta carpeta

//funciones que hacen las cosnultas al backend
const urlServicios = import.meta.env.VITE_SERVICIO;

export const listarServiciosApi = async() => {
    try{
        const respuesta = await fetch(urlServicios) // espera la respuesta del fetch 
        return respuesta 
    }catch(error){
        console.error(error)
    }
}

export const crearServiciosApi = async(servicio) => {
    try{
        const respuesta = await fetch(urlServicios,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(servicio)
        }) // espera la respuesta del fetch 
        return respuesta 
    }catch(error){
        console.error(error)
    }
}


export const borrarServiciosApi = async(servicio) => {
    try{
        const respuesta = await fetch(urlServicios + `/${id}`,{
            method: 'DELETE',
        }) // espera la respuesta del fetch 
        return respuesta 
    }catch(error){
        console.error(error)
    }
}

export const buscarServiciosApi = async(id) => {
    try{
        const respuesta = await fetch(urlServicios + `/${id}`)
        return respuesta 
    }catch(error){
        console.error(error)
    }
}