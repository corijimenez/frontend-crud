import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import Administrador from "./components/pages/Administrador";
import DetalleServicio from "./components/pages/DetalleServicio";
import FormularioServicio from "./components/pages/FormularioServicio";
import Error404 from "./components/pages/Error404";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import { useEffect, useState } from "react";
import ProtectorRutas from "./components/routes/ProtectorRutas";

function App() {
  const usuarioSessionStorage =
    JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);
  const serviciosLocalStorage = JSON.parse(localStorage.getItem('serviciosKey')) || []
  const [servicios, setServicios] = useState(serviciosLocalStorage)

  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  useEffect(()=>{
    localStorage.setItem('serviciosKey', JSON.stringify(servicios))
  },[servicios])

  return (
    <BrowserRouter>
      <Menu
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      ></Menu>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>} />
        <Route
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>}
        />
        <Route path="/detalle/:id" element={<DetalleServicio></DetalleServicio>} />
        <Route
          path="/administrador"
          element={
            <ProtectorRutas usuarioLogueado={usuarioLogueado}></ProtectorRutas>
          }
        >
          <Route
            index
            element={<Administrador></Administrador>}
          />
          <Route
            path="crear"
            element={<FormularioServicio titulo={'Crear servicio'}></FormularioServicio>}
          />
          <Route
            path="editar/:id"
            element={<FormularioServicio titulo={'Editar servicio'}></FormularioServicio>}
          />
        </Route>

        <Route path="*" element={<Error404></Error404>} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;