import { Row } from "react-bootstrap";
import CardServicio from "../services/CardServicio";
import { useEffect, useState } from "react";
// import { listarServiciosApi } from "../../helpers/queries";

const Inicio = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const respuestaServicios = await listarServiciosApi();
    if (respuestaServicios && respuestaServicios.status === 200) {
      const datos = await respuestaServicios.json();
      setServicios(datos);
    } else {
      alert(
        "Ocurrio un error no se puede mostrar los productos en este momento"
      );
    }
  };

  return (
    <main className="container my-4">
      <h1>Catalogo de servicios</h1>
      <Row xs={1} md={3} lg={4} className="g-4">
        {servicios.map((servicio) => (
          <CardServicio key={servicio._id} servicio={servicio}></CardServicio>
        ))}
      </Row>
    </main>
  );
};

export default Inicio;