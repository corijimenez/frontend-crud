import { Card, Col } from "react-bootstrap";
import { Link } from "react-router";

const CardServicio = ({servicio}) => {
  return (
    <Col>
      <Card >
        <Card.Img variant="top" src={servicio.imagen} alt={servicio.servicio} />
        <Card.Body>
          <Card.Title>{servicio.servicio}</Card.Title>
          <Card.Text>
            {servicio.descripcion_breve}
          </Card.Text>
          <Card.Text>
            Precio: $ {servicio.precio}
          </Card.Text>
          <Link className="primary" to={`/detalle/${servicio._id}`}>Ver detalle</Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardServicio;