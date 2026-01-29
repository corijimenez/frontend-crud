// aqui van estar las consultas al back, si necesito asm consultas creo mas archivos dentro de esta carpeta

//funciones que hacen las cosnultas al backend
const urlServicios = import.meta.env.VITE_SERVICIO;
const urlUsuarios = import.meta.env.VITE_USUARIO;

export const listarServiciosApi = async () => {
  try {
    const respuesta = await fetch(urlServicios); // espera la respuesta del fetch
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const crearServicioApi = async (servicio) => {
  try {
    const respuesta = await fetch(urlServicios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("usuarioKey")).token}`,
      },
      body: JSON.stringify(servicio),
    }); // espera la respuesta del fetch
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const borrarServicioApi = async (servicio) => {
  try {
    const respuesta = await fetch(urlServicios + `/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("usuarioKey")).token}`,
      },
    }); // espera la respuesta del fetch
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const buscarServicioApi = async (id) => {
  try {
    const respuesta = await fetch(urlServicios + `/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const editarServicioApi = async (servicio, id) => {
  try {
    const respuesta = await fetch(urlServicios + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("usuarioKey")).token}`,
      },
      body: JSON.stringify(servicio),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const login = async(usuario) =>{
    try {
        const respuesta = await fetch(urlUsuarios+'/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        return respuesta
    } catch (error) {
        console.error(error)
    }
};
