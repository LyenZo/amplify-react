import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import Categorias from './pages/Categorias';

function App() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    background: '#1a202c', // Color oscuro profundo
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };

  const linkStyle = {
    color: '#edf2f7',
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'color 0.3s'
  };

  return (
    <Router>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>🏠 Inicio</Link>
        <Link to="/cursos" style={linkStyle}>📚 Gestión de Cursos</Link>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;