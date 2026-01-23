import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { buscarServicioApi, crearServicioApi } from "../../helpers/queries";

const FormularioServicio = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    
    cargarDatos();
  }, []);

  // en el use effect no se puede usar async await directamente por eso creo esta funcion aparte
  const cargarDatos = async () => {
    // si estoy editando entonces busco el objeto para dibujar en el formulario
    if (titulo === "Editar servicio") {
      // const servicioBuscado = buscarServicio(id);
      const respuestaServicio = await buscarServicioApi(id);
      if (respuestaServicio && respuestaServicio.status === 200) {
        const servicioBuscado = await respuestaServicio.json(); //extrae los datos del body

        setValue("servicio", servicioBuscado.servicio);
        setValue("precio", servicioBuscado.precio);
        setValue("categoria", servicioBuscado.categoria);
        setValue("descripcion_breve", servicioBuscado.descripcion_breve);
        setValue("descripcion_amplia", servicioBuscado.descripcion_amplia);
        setValue("imagen", servicioBuscado.imagen);
      }
    }
  };

  const onSubmit = async (data) => { // agrego el async por cada await
    console.log(data);
    if (titulo === "Crear servicio") {
      //agrego la logica de crear
      const respuestaServicioCreado = await crearServicioApi(data); //llamo a la api para crear el servicio. idem como la funcion listar
      if (respuestaServicioCreado && respuestaServicioCreado.status === 201) {
        Swal.fire({
          title: "Servicio creado",
          text: `El servicio '${data.servicio}' fue creado correctamente`,
          icon: "success",
        });
        reset();
      } else {
        Swal.fire({
          title: "Ocurrio un error al mostrar el servicio",
          text: `El servicio '${data.servicio}' no fue creado.`,
          icon: "error",
        });
      }
    } else {
      //agregar la logica para editar
      const respuestaEditarServicio = await editarServicioApi(data, id) //lamo a la api para editar el servicio
      if(respuestaEditarServicio && respuestaEditarServicio.status === 200){
        Swal.fire({
          title: "Servicio editado",
          text: `El servicio '${data.servicio}' fue editado correctamente`,
          icon: "success",
        });
        navegacion("/administrador");
      }else{
         Swal.fire({
          title: "Ocurrio un error al mostrar el servicio",
          text: `El servicio '${data.servicio}' no pudo ser editado. Intenta nuevamente en unos minutos`,
          icon: "error",
        });
      }
    }
  };

  return (
    <main className="container my-4">
      <h1>{titulo}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Servicio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Diseño de sitio web institucional"
            {...register("servicio", {
              required: "El servicio es un dato obligatorio",
              minLength: {
                value: 5,
                message: "El servicio debe contener como minimo 5 caracteres",
              },
              maxLength: {
                value: 100,
                message: "El servicio debe contener como maximo 100 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.servicio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            // step={0.1}
            {...register("precio", {
              required: "El precio es un valor obligatorio",
              min: {
                value: 50,
                message:
                  "El precio minimo del producto debe ser de almenos $50",
              },
              max: {
                value: 1000000,
                message:
                  "El precio maximo de un producto debe ser de hasta $1000000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/image/"
            {...register("imagen", {
              required: "La url de la imagen es un dato obligatorio",
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/,
                message:
                  "La imagen debe ser una url de imagen valida terminada en (jpg|jpeg|png|webp)",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "Debe seleccionar una categoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Desarrollo Web">Desarrollo Web</option>
            <option value="Backend y API">Backend & API</option>
            <option value="Consultoría">Consultoría</option>
            <option value="Otros">Otros</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Web profesional *responsive* con secciones clave: Inicio, Servicios, Quiénes Somos, Contacto y Blog (sin funcionalidad de publicación)"
            as="textarea"
            {...register("descripcion_breve", {
              required: "La descripción breve es un dato obligatorio",
              minLength: {
                value: 5,
                message: "La descrición breve debe tener almenos 5 caracteres",
              },
              maxLength: {
                value: 250,
                message:
                  "La descrición breve debe tener como máximo 250 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_breve?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción Amplia*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Desarrollo de un sitio web corporativo **moderno y optimizado para SEO**. Incluye diseño personalizado basado en plantillas, integración de formulario de contacto, galería de imágenes, y hasta 7 páginas principales. Ideal para empresas que necesitan una fuerte presencia digital."
            as="textarea"
            rows={4}
            {...register("descripcion_amplia", {
              required: "La descripción amplia es un dato obligatorio",
              minLength: {
                value: 10,
                message:
                  "La descrición amplia debe tener almenos 10 caracteres",
              },
              maxLength: {
                value: 500,
                message:
                  "La descrición amplia debe tener como máximo 500 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_amplia?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </main>
  );
};

export default FormularioServicio;