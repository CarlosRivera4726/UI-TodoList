import { useQuery } from "@apollo/client";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Remove } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ITodo from "@/app/interfaces/ITodo";
import { GET_TODO_LIST } from "@/app/interfaces/const";
const user = localStorage.getItem('fullname')

const TodoList = () => {
    const router = useRouter()
    const { loading, error, data } = useQuery(GET_TODO_LIST)
    if (loading) return (<p>Loading ...</p>)
    if (error) return (<p>{error.message}</p>)

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
            <h2 className="text-2xl text-center text-black font-semibold mb-8">TODO LIST - USER: {user}</h2>
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
                        {data.Todos.map((row: ITodo) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    <section className="flex flex-row gap-7 justify-center">
                                        <button className="text-center text-blue-700" onClick={() => handleTodoListEdit(row.id)}> <EditIcon /> Edit </button>
                                        <button className="text-center text-red-700" onClick={() => handleTodoListDelete(row.id)}> <Remove /> Remove </button>
                                        <button className="text-center text-green-700" onClick={() => handleTodoListView(row.id)}> <RemoveRedEyeIcon /> View </button>
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