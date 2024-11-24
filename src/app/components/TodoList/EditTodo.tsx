"use client"
import { GET_TODO_LIST_BY_ID_, STATUS } from "@/app/interfaces/const"
import { useQuery } from "@apollo/client"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"

interface IdProps {
   id: string | string[] | undefined
}

const EditTodo = ({ id }: IdProps) => {
    
    const { loading, error, data } = useQuery(GET_TODO_LIST_BY_ID_, {
        variables: { _eq: id },
    });
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    

    useEffect(() => {
        if (data) {
            const todo = data.Todos[0]
            setTitle(todo.title)
            setDescription(todo.description)
            setStatus(todo.status)
        }
    }, [data])
    
    

    const handleEditTodo = async () => {
        /*const { data } = await updateTodo({
            variables: {
                id: todo.id,
                title,
                description
            }
        })
        if (data) {
            onEdit()
            router.replace("/pages/todo")
        }*/
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <section className="m-32">
            <h2 className="text-2xl text-center text-black font-semibold mb-8">EDIT TODO</h2>
            <section className="flex flex-col gap-4">
                <form className="flex flex-col gap-4">
                    <TextField
                        id="title"
                        label="Titulo"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        id="description"
                        label="Descripcion"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Estado"
                        >
                            {
                                STATUS.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))
                            }
                        </Select>
                        </FormControl>
                    <button
                        type="button"
                        className="bg-blue-700 text-white font-semibold py-2"
                        onClick={handleEditTodo}
                    >
                        Editar
                    </button>
                </form>
            </section>
        </section>
    )
}

export default EditTodo