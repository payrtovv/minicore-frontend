import { Routes, Route } from "react-router-dom";

import Comisiones from "./components/comisiones";
import CrearVenta from "./components/CrearVenta";
function App() {
  return (
    <Routes>
      <Route path="/Comisiones" element={<Comisiones />} />
      <Route path="/Ventas" element={<CrearVenta />} />
    </Routes>
  );
}

export default App;
