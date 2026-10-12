import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API } from "./api";

export default function Comisiones() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setData(null);

    const params = new URLSearchParams({ desde, hasta });
    const res = await fetch(`${API}/comisiones/?${params}`);
    const json = await res.json();

    if (!res.ok) return setError(json.error);
    setData(json);
  };

  return (
    <div className="comisiones">
      <div className="header">
        <h1 className="comisiones__title">Cálculo de comisiones</h1>
        <button
          className="comisiones__button"
          onClick={() => navigate("/Ventas")}
        >
          Ventas
        </button>
      </div>
      <form className="comisiones__form" onSubmit={handleSubmit}>
        <label className="comisiones__field">
          <span>Desde</span>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            required
          />
        </label>
        <label className="comisiones__field">
          <span>Hasta</span>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="comisiones__button">
          Calcular
        </button>
      </form>

      {error && <p className="comisiones__error">{error}</p>}

      {data &&
        (data.resultados.length === 0 ? (
          <p className="comisiones__empty">No hay ventas en ese rango.</p>
        ) : (
          <div className="comisiones__table-wrapper">
            <table className="comisiones__table">
              <thead>
                <tr>
                  <th>Vendedor</th>
                  <th className="num">Ventas</th>
                  <th className="num">Total</th>
                  <th className="num">%</th>
                  <th className="num">Comisión</th>
                </tr>
              </thead>
              <tbody>
                {data.resultados.map((r) => (
                  <tr key={r.vendedor_id}>
                    <td>{r.vendedor}</td>
                    <td className="num">{r.num_ventas}</td>
                    <td className="num">${r.total_ventas}</td>
                    <td className="num">{r.porcentaje}%</td>
                    <td className="num comision">${r.comision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
