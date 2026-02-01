import { useNavigate, useParams } from "react-router";
import { Card, Badge, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { buscarServicioApi } from "../../helpers/queries";
import { useEffect, useState } from "react";

const DetalleServicio = () => {
    // id pasado en el path. id es un objeto que devuelve useParams
    const { id } = useParams();
    console.log(id)
    const navegacion = useNavigate()
    const [servicio, setServicio] = useState({});

    useEffect(()=>{
        obtenerServicio()
    },[])

    const obtenerServicio = async ()=>{
        const respuesta = await buscarServicioApi(id)
        if( respuesta && respuesta.status === 200){
            const servicioBuscado = await respuesta.json()
            setServicio(servicioBuscado)
        }else{
          alert('Ocurrio un error al obtener un servicio, intetalo en unos minutos')
        }
    }
    
    return (
        <main className="container my-4">
            <h1 className="mb-3">Detalle Servicio</h1>

            <Card className="shadow-lg border-0">
                <Row className="g-0">
                    {/* Imagen */}
                    <Col md={5}>
                        <Card.Img
                            src={servicio.imagen}
                            alt={servicio.servicio}
                            className="h-100 object-fit-cover"
                        />
                    </Col>

                    {/* Contenido */}
                    <Col md={7}>
                        <Card.Body className="p-4">
                            <Badge bg="primary" className="mb-2">
                                {servicio.categoria}
                            </Badge>

                            <Card.Title className="fs-3 mt-2">
                                {servicio.servicio}
                            </Card.Title>

                            <Card.Subtitle className="text-success fs-4 fw-bold my-3">
                                USD {servicio.precio}
                            </Card.Subtitle>

                            <Card.Text className="fw-semibold">
                                {servicio.descripcion_breve}
                            </Card.Text>

                            <Card.Text className="text-muted">
                                {servicio.descripcion_amplia}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </main>
    );
};

export default DetalleServicio;