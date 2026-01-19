import { Table } from "react-bootstrap";
import ItemTabla from "../services/ItemTabla";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { listarServiciosApi } from "../../helpers/queries";


const Administrador = () => {
  const [servicios, setServicios] = useState([]) //aqui se alojara lo que me llegue desde la api
  
  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async() => {
    const respuestaServicios =await listarServiciosApi()
    console.log(respuestaServicios);
    if(respuestaServicios && respuestaServicios.status === 200){
      const datos = await respuestaServicios.json();//extrae los datos del body 
      setServicios(datos);
    }else{
      alert("Ocurrio un error no se puede mostrar los productos en este momento")
    }
  };

  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Administrar servicios</h1>
        <Link className="btn btn-primary" to={"/administrador/crear"}>
          Crear
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Servicio</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio, indice) => (
            <ItemTabla
              key={servicio._id} //cambio el id por _id que es como mongo lo maneja
              servicio={servicio}
              fila={indice + 1}
            ></ItemTabla>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default Administrador;