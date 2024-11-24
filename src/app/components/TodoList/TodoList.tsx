"use client"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Remove } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ITodo from "@/app/interfaces/ITodo";
import { GET_TODO_LIST_BY_USERID } from "@/app/interfaces/const";
import axios from "axios";
import { useState } from "react";
import { getServerSession } from "next-auth";

interface TodoListProps {
    todos: ITodo[];
    userId: string | null | undefined;
    userName: string | null | undefined;
  }
  

const TodoList: React.FC<TodoListProps> = ({todos, userId, userName}) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleTodoListEdit = (id: string) => {
        console.log("Editando el todo con ID: ", id)
        router.replace(`/pages/todo/${id}`)
    }

    const handleTodoListDelete = (id: string) => {
        console.log("Eliminado el todo con ID: ", id)
        router.replace(`/pages/todo/${id}`)
    }
    const handleTodoListView = (id: string) => {
        console.log("Mirando el todo con ID: ", id)
        router.replace(`/pages/todo/${id}`)
    }

   
    return (

        <section className="m-32">
            <h2 className="text-2xl text-center text-black font-semibold mb-8">TODO LIST - USER: {userName}</h2>
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
                                        <button className="text-center text-blue-700" onClick={() => handleTodoListEdit(todo.id)}> <EditIcon /> Edit </button>
                                        <button className="text-center text-red-700" onClick={() => handleTodoListDelete(todo.id)}> <Remove /> Remove </button>
                                        <button className="text-center text-green-700" onClick={() => handleTodoListView(todo.id)}> <RemoveRedEyeIcon /> View </button>
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