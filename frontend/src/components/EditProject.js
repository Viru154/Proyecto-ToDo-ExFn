// frontend/src/components/EditProject.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import styled from 'styled-components';

Modal.setAppElement('#root');

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
`;

const InputField = styled.input`
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const SelectField = styled.select`
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const EditProject = ({ project, isOpen, onClose, onProjectUpdated }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [prioridad, setPrioridad] = useState('media');
    const [asignadoA, setAsignadoA] = useState('');
    const [categoria, setCategoria] = useState('');
    const [costoProyecto, setCostoProyecto] = useState('');

    useEffect(() => {
        if (project) {
            setTitulo(project.titulo);
            setDescripcion(project.descripcion || '');
            setFechaVencimiento(project.fecha_vencimiento || '');
            setPrioridad(project.prioridad || 'media');
            setAsignadoA(project.asignado_a || '');
            setCategoria(project.categoria || '');
            setCostoProyecto(project.costo_proyecto || '');
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/${project.id}`, {
                titulo,
                descripcion,
                fecha_vencimiento: fechaVencimiento,
                prioridad,
                asignado_a: asignadoA,
                categoria,
                costo_proyecto: parseFloat(costoProyecto)
            });
            onProjectUpdated();
            toast.success("Proyecto actualizado con éxito!");
            onClose();
        } catch (error) {
            toast.error("Error al actualizar el proyecto");
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={{ content: { width: '400px', margin: 'auto' } }}>
            <FormContainer>
                <h2>Editar Proyecto</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        type="text"
                        placeholder="Título del proyecto"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                    <InputField
                        type="text"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <InputField
                        type="date"
                        placeholder="Fecha de vencimiento"
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                    />
                    <SelectField
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                    >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </SelectField>
                    <InputField
                        type="text"
                        placeholder="Asignado a"
                        value={asignadoA}
                        onChange={(e) => setAsignadoA(e.target.value)}
                    />
                    <InputField
                        type="text"
                        placeholder="Categoría"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                    <InputField
                        type="number"
                        placeholder="Costo del proyecto"
                        value={costoProyecto}
                        onChange={(e) => setCostoProyecto(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                        Guardar Cambios
                    </Button>
                </form>
            </FormContainer>
        </Modal>
    );
};

export default EditProject;