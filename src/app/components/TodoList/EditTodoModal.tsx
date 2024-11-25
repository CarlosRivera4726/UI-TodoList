"use client";

import { GET_TODO_LIST_BY_ID_, STATUS, UPDATE_TODO_BY_ID } from "@/app/constants/const";
import { useMutation, useQuery } from "@apollo/client";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { style } from "./TodoListModal";
import { useRouter } from "next/navigation";

interface EditTodoProps {
    id: string | null | undefined;
    open: boolean;
    onClose: () => void;
}

const EditTodoModal = ({ id, open, onClose }: EditTodoProps) => {
    // Apollo Query
    const { loading, error, data } = useQuery(GET_TODO_LIST_BY_ID_, {
        variables: { _eq: id },
    });

    // Component State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [updateTodo, { loading: loadingMutation, error: errorMutation }] = useMutation(UPDATE_TODO_BY_ID);
    const router = useRouter()

    // Effect to update state when data is fetched
    useEffect(() => {
        if (data) {
            const todo = data.Todos[0];
            setTitle(todo.title);
            setDescription(todo.description);
            setStatus(todo.status);
        }
    }, [data]);

    // Event Handlers
    const handleUpdateTodo = async () => {
        try {
            const { data } = await updateTodo({
                variables: {
                    id,
                    title,
                    description,
                    status,
                },
            });

            console.log("Actualización exitosa:", data);
            onClose(); // Cierra el modal después de la actualización
            router.refresh()
        } catch (err) {
            console.error("Error al actualizar:", err);
        }
    };

    // Loading and Error States
    if (loading) return;
    if (error) return;

    return (
        <>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={onClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className="rounded-lg">
                        <section className="m-32">
                            <h2 className="text-2xl text-center text-black font-semibold mb-8">EDIT TODO</h2>
                            <section className="flex flex-col gap-4">
                                <form className="flex flex-col gap-4">
                                    {/* Title Input */}
                                    <TextField
                                        id="title"
                                        label="Titulo"
                                        variant="outlined"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    {/* Description Input */}
                                    <TextField
                                        id="description"
                                        label="Descripcion"
                                        variant="outlined"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                    {/* Status Select */}
                                    <FormControl fullWidth>
                                        <InputLabel id="status-select-label">Estado</InputLabel>
                                        <Select
                                            labelId="status-select-label"
                                            id="status-select"
                                            value={status} // Aquí se asegura que se seleccione el valor actual
                                            label="Estado"
                                            onChange={(e) => setStatus(e.target.value)} // Actualiza el estado al cambiar
                                        >
                                            {STATUS.map((item) => (
                                                <MenuItem key={item.value} value={item.label}>
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* Submit Button */}
                                    <button
                                        type="button"
                                        className="bg-blue-700 text-white font-semibold py-2"
                                        onClick={handleUpdateTodo}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-700 text-white font-semibold py-2"
                                        onClick={onClose}
                                    >
                                        CANCELAR
                                    </button>
                                </form>
                            </section>
                        </section>
                    </Box>

                </Fade>
            </Modal>
        </>
    );
};

export default EditTodoModal;
