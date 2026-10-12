import { Routes, Route, Link, Navigate } from "react-router-dom";

import Comisiones from "./components/Comisiones";
import CrearVenta from "./components/CrearVenta";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/ventas" replace />} />
        <Route path="/ventas" element={<CrearVenta />} />
        <Route path="/comisiones" element={<Comisiones />} />
        <Route
          path="*"
          element={<p style={{ textAlign: "center" }}>Página no encontrada</p>}
        />
      </Routes>
    </>
  );
}

export default App;
