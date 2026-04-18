import { useEffect, useState } from 'react';
import axios from 'axios';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // Función para obtener cursos (con o sin filtros)
  const fetchCursos = () => {
    // Construimos la URL con parámetros de búsqueda
    const url = `http://127.0.0.1:5000/api/courses?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
    
    axios.get(url)
      .then(res => setCursos(res.data))
      .catch(err => console.error("Error al traer cursos:", err));
  };

  // Cargar cursos al montar el componente
  useEffect(() => {
    fetchCursos();
  }, []);

  // Estilos rápidos para que se vea profesional
  const filterBoxStyle = {
    background: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '10px',
    marginBottom: '20px',
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    border: '1px solid #e2e8f0'
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #cbd5e0'
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#1a202c' }}>📚 Listado de Cursos</h2>

      {/* --- SECCIÓN DE FILTROS --- */}
      <div style={filterBoxStyle}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Desde:</label>
          <input 
            type="date" 
            value={fechaInicio} 
            onChange={(e) => setFechaInicio(e.target.value)} 
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Hasta:</label>
          <input 
            type="date" 
            value={fechaFin} 
            onChange={(e) => setFechaFin(e.target.value)} 
            style={inputStyle}
          />
        </div>
        <button 
          onClick={fetchCursos} 
          style={{ 
            padding: '10px 20px', 
            background: '#3182ce', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Filtrar Cursos
        </button>
        <button 
          onClick={() => { setFechaInicio(''); setFechaFin(''); }} 
          style={{ background: 'none', border: 'none', color: '#718096', cursor: 'pointer' }}
        >
          Limpiar
        </button>
      </div>

      {/* --- TABLA DE RESULTADOS --- */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead style={{ background: '#2d3748', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left' }}>Nombre</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Precio</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Categoría</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          {cursos.length > 0 ? cursos.map(c => (
            <tr key={c.id} style={{ borderBottom: '1px solid #edf2f7' }}>
              <td style={{ padding: '12px' }}>{c.nombre}</td>
              <td style={{ padding: '12px' }}>${c.precio}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ background: '#ebf8ff', color: '#2b6cb0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  {c.nombre_categoria || 'Sin categoría'}
                </span>
              </td>
              <td style={{ padding: '12px' }}>{c.fecha_registro || 'N/A'}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#a0aec0' }}>
                No se encontraron cursos en este rango de fechas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cursos;