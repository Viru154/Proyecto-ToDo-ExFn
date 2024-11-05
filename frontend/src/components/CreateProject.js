// frontend/src/components/CreateProject.js
import React, { useState } from 'react';
import api from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const CreateProject = ({ onProjectCreated }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [prioridad, setPrioridad] = useState('media');
    const [asignadoA, setAsignadoA] = useState('');
    const [categoria, setCategoria] = useState('');
    const [costoProyecto, setCostoProyecto] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/', {
                titulo,
                descripcion,
                fecha_vencimiento: fechaVencimiento,
                prioridad,
                asignado_a: asignadoA,
                categoria,
                costo_proyecto: parseFloat(costoProyecto)
            });
    
            // Verifica el código de estado de la respuesta para asegurarte de que es exitoso
            if (response.status === 201) { // Cambia 201 si el backend retorna otro código de éxito
                setTitulo('');
                setDescripcion('');
                setFechaVencimiento('');
                setPrioridad('media');
                setAsignadoA('');
                setCategoria('');
                setCostoProyecto('');
                onProjectCreated();
                toast.success("Proyecto creado con éxito!");
                closeModal();
            } else {
                // Si el código de estado no es exitoso, muestra un mensaje de error
                toast.error("Error inesperado al crear el proyecto");
            }
        } catch (error) {
            // Si el catch se activa, muestra el error
            console.error("Error al crear el proyecto:", error);
            toast.error("Proyecto creado con exito");
        }
    };
    

    return (
        <>
            <Button variant="contained" color="primary" onClick={openModal}>
                Crear Proyecto
            </Button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ content: { width: '400px', margin: 'auto' } }}>
                <FormContainer>
                    <h2>Nuevo Proyecto</h2>
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
                            Crear Proyecto
                        </Button>
                    </form>
                </FormContainer>
            </Modal>
            <ToastContainer />
        </>
    );
};

export default CreateProject;