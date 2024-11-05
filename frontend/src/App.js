import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectList from './components/ProjectList';
import CreateProject from './components/CreateProject';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si hay un token en el localStorage al cargar la app
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Proyectos</h1>
        {isAuthenticated && <button onClick={handleLogout}>Cerrar sesión</button>}
      </header>
      <main>
        {!isAuthenticated ? (
          <>
            <Login setIsAuthenticated={setIsAuthenticated} />
            <Register />
          </>
        ) : (
          <>
            <CreateProject />
            <ProjectList />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
