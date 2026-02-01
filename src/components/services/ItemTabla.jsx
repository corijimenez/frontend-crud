import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { borrarServicioApi } from "../../helpers/queries";

const ItemTabla = ({ servicio, fila, servicios, setServicios }) => {
  const eliminarServicio = () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar el servicio?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // borrarServicio(servicio.id);
        const respuestaBorrarServicio = await borrarServicioApi(servicio._id);
        if (respuestaBorrarServicio && respuestaBorrarServicio.status === 200) {
          Swal.fire({
            title: "Servicio eliminado",
            text: `El servicio ${servicio.servicio} fue eliminado correctamente`,
            icon: "success",
          });
          // agregar algo para que la tabla de servicios se actulice
          const serviciosActualizados = servicios.filter((item)=> item._id !== servicio._id)
          setServicios(serviciosActualizados)
        }else{
           Swal.fire({
            title: "Ocurrio un error al intentar borrar el servicio",
            text: `El servicio ${servicio.servicio} no pudo ser eliminado, intente este proceso en unos minutos.`,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <tr>
      <td>{fila}</td>
      <td>{servicio.servicio}</td>
      <td>${servicio.precio}</td>
      <td>
        <Link
          className="me-2 btn btn-warning"
          to={`/administrador/editar/${servicio._id}`}
        >
          Editar
        </Link>
        <Button variant="danger" onClick={eliminarServicio}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemTabla;