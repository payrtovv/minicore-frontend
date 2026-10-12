import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API } from "./api";

export default function CrearVenta() {
  const [vendedores, setVendedores] = useState([]);
  const [vendedorId, setVendedorId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarVendedores = async () => {
      try {
        const res = await fetch(`${API}/vendedores/`);
        if (!res.ok) throw new Error();
        setVendedores(await res.json());
      } catch {
        setError("No se pudo cargar la lista de vendedores");
      }
    };
    cargarVendedores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);

    try {
      const res = await fetch(`${API}/ventas/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Vendedor: Number(vendedorId),
          cantidad: Number(cantidad),
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        const mensajes = Object.values(json).flat().join(" ");
        setError(mensajes || "No se pudo registrar la venta");
        return;
      }

      setExito(`Venta registrada el ${json.fecha} por $${json.cantidad}`);
      setCantidad("");
      setVendedorId("");
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="comisiones">
      <div className="header">
        <h1 className="comisiones__title">Registrar venta</h1>
        <button
          className="comisiones__button"
          onClick={() => navigate("/comisiones")}
        >
          Ir a comisiones
        </button>
      </div>
      <form className="comisiones__form" onSubmit={handleSubmit}>
        <label className="comisiones__field">
          <span>Vendedor</span>
          <select
            value={vendedorId}
            onChange={(e) => setVendedorId(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecciona un vendedor
            </option>
            {vendedores.map((v) => (
              <option key={v.id} value={v.id}>
                {v.Nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="comisiones__field">
          <span>Cantidad</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="comisiones__button"
          disabled={cargando}
        >
          {cargando ? "Guardando..." : "Guardar venta"}
        </button>
      </form>

      {error && <p className="comisiones__error">{error}</p>}
      {exito && <p className="comisiones__success">{exito}</p>}
    </div>
  );
}
