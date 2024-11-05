// frontend/src/components/ProjectList.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import EditProject from './EditProject';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import './ProjectList.css';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/');
            setProjects(response.data);
        } catch (error) {
            toast.error("Error al obtener los proyectos");
        }
    };

    const handleEditClick = (project) => {
        setSelectedProject(project);
        setEditModalOpen(true);
    };

    const handleProjectUpdated = () => {
        fetchProjects();
        setEditModalOpen(false);
    };

    const handleDelete = async (projectId) => {
        try {
            await api.delete(`/${projectId}`);
            fetchProjects(); // Actualiza la lista después de eliminar
            toast.success("Proyecto eliminado con éxito!");
        } catch (error) {
            toast.error("Error al eliminar el proyecto");
        }
    };

    return (
        <div>
            <h2>Lista de Proyectos</h2>
            {projects.map((project) => (
                <div key={project.id} className="project-card">
                    <h3>{project.titulo}</h3>
                    <p>Prioridad: {project.prioridad}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button variant="contained" color="primary" onClick={() => handleEditClick(project)}>
                            Editar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(project.id)}>
                            Eliminar
                        </Button>
                    </div>
                </div>
            ))}
            {selectedProject && (
                <EditProject
                    project={selectedProject}
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onProjectUpdated={handleProjectUpdated}
                />
            )}
        </div>
    );
};

export default ProjectList;
