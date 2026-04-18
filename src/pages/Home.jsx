import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🚀 Panel de Gestión de Cursos</h1>
      <p>Bienvenido al sistema de administración de la UTVT.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/cursos">
          <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Ver Cursos</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;