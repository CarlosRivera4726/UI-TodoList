"use client"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Remove } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ITodo from "@/app/interfaces/ITodo";
import { useState } from "react";
import TodoListModal from "./TodoListModal";
import { ApolloProvider } from "@apollo/client";
import client from "@/db/conexion";
import EditTodoModal from "./EditTodoModal";
import { DELETE_TODO_BY_ID, HEADERS } from "@/app/constants/const";
import axios from "axios";

interface TodoListProps {
    todos: ITodo[];
    userId: string | null | undefined;
    userName: string | null | undefined;
}


const TodoList: React.FC<TodoListProps> = ({ todos, userId, userName }) => {
    localStorage.setItem('userId', userId || '');
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true);
    const [openTodoAdd, setOpenTodoAdd] = useState<boolean>(false);
    const [openTodoEdit, setOpenTodoEdit] = useState<boolean>(false);
    const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTodoListEdit = (id: string) => {
        setSelectedTodoId(id)
        setOpenTodoEdit(true)
    }

    const handleCloseTodoEdit = () => {
        setSelectedTodoId(null)
        setOpenTodoEdit(false)
    }

    const handleTodoListDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        const parsedId = String(id);
        if (confirmDelete) {
          try {
            // Hacer la solicitud de eliminación con axios
            console.log({
                query: DELETE_TODO_BY_ID,
                variables: { id },
              });
            const { data } = await axios.post(
              "https://stirred-ladybird-74.hasura.app/v1/graphql",
              {
                query: DELETE_TODO_BY_ID,
                variables: { id: parsedId }, 
              },
              {
                headers: HEADERS,
              }
            );
      
            // Confirmar en la consola y al usuario
            console.log("Deleted task:", data);
            alert("Task deleted successfully!");
      
            // Refrescar la lista (o redirigir)
            router.refresh();
          } catch (err) {
            console.error("Error deleting task:", err);
            alert("Failed to delete task.");
          }
        }
      };

    const handleTodoListAdd = () => {
        console.log("Agregando un nuevo todo");
        setOpenTodoAdd(true);
    };

    const handleCloseTodoAdd = () => {
        setOpenTodoAdd(false);
    };


    return (

        <section className="m-32">
            <h2 className="text-2xl text-center text-black font-semibold mb-8">TODO LIST - USER: {userName}</h2>

            <section>
                <button className="bg-blue-600 rounded p-3 text-white uppercase mb-3 font-bold" onClick={handleTodoListAdd}>AGREGAR TAREA</button>
                <ApolloProvider client={client}>
                    <TodoListModal open={openTodoAdd} onClose={handleCloseTodoAdd} />
                </ApolloProvider>
            </section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="">
                        <TableRow>
                            <TableCell className="font-bold text-sm uppercase text-white">Titulo</TableCell>
                            <TableCell align="right" className="font-bold text-sm uppercase text-center text-white">Descripcion</TableCell>
                            <TableCell align="right" className="font-bold text-sm uppercase text-white">Estado</TableCell>
                            <TableCell align="center" className="font-bold text-sm uppercase text-white">Utilidades</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.map((todo: ITodo) => (
                            <TableRow
                                key={todo.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {todo.title}
                                </TableCell>
                                <TableCell align="right">{todo.description}</TableCell>
                                <TableCell align="right">{todo.status}</TableCell>
                                <TableCell align="right">
                                    <section className="flex flex-row gap-7 justify-center">
                                        <div>
                                            <button className="text-center text-blue-700" onClick={() => handleTodoListEdit(todo.id)}> <EditIcon /> Edit </button>
                                            <ApolloProvider client={client}>
                                                <EditTodoModal open={openTodoEdit} onClose={handleCloseTodoEdit} id={selectedTodoId} />
                                            </ApolloProvider>
                                        </div>
                                        <button className="text-center text-red-700" onClick={() => handleTodoListDelete(todo.id)}> <Remove /> Remove </button>
                                    </section>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}



export default TodoList;