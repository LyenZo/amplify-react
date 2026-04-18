import { useEffect, useState } from 'react';
import axios from 'axios';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');

  // 1. Obtener categorías usando la URL completa de Flask
  const fetchCategorias = () => {
    axios.get('http://127.0.0.1:5000/api/categories')
      .then(res => {
        console.log("Categorías cargadas:", res.data);
        setCategorias(res.data);
      })
      .catch(err => {
        console.error("Error al cargar categorías:", err);
        alert("Error de conexión con el servidor (Flask). Revisa si está encendido.");
      });
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // 2. Crear categoría usando la URL completa de Flask
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    axios.post('http://127.0.0.1:5000/api/categories', { nombre })
      .then(() => {
        setNombre(''); // Limpiar el input
        fetchCategorias(); // Recargar la lista automáticamente
      })
      .catch(err => console.error("Error al crear categoría:", err));
  };

  // --- ESTILOS EN LÍNEA ---
  const cardStyle = {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    border: '1px solid #e2e8f0'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem'
  };

  const itemStyle = {
    background: '#f8fafc',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '500',
    color: '#1e293b'
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', paddingTop: '20px' }}>
      <h2 style={{ color: '#1a202c', marginBottom: '1.5rem' }}>📂 Gestión de Categorías</h2>
      
      {/* Formulario de Creación */}
      <div style={cardStyle}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#4a5568' }}>Nueva Categoría</h4>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Ej. Programación, Diseño..." 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #cbd5e0',
              outline: 'none'
            }}
          />
          <button type="submit" style={{ 
            padding: '12px 24px', 
            background: '#3182ce', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Agregar
          </button>
        </form>
      </div>

      {/* Listado en Cuadrícula */}
      <h4 style={{ color: '#4a5568' }}>Categorías Registradas</h4>
      {categorias.length === 0 ? (
        <p style={{ color: '#a0aec0' }}>No hay categorías registradas aún.</p>
      ) : (
        <div style={gridStyle}>
          {categorias.map(cat => (
            <div key={cat.id} style={itemStyle}>
              <span>{cat.nombre}</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                ID: {cat.id}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categorias;