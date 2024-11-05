// frontend/src/App.js
import React from 'react';
import './App.css';
import ProjectList from './components/ProjectList';
import CreateProject from './components/CreateProject';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Proyectos</h1>
      </header>
      <main>
        <CreateProject />
        <ProjectList />
      </main>
    </div>
  );
}

export default App;
