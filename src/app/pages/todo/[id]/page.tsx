"use client";
import EditTodo from "@/app/components/TodoList/EditTodo";
import client from "@/db/conexion";
import { ApolloProvider } from "@apollo/client";
import { usePathname } from "next/navigation";

const TodoListId = () => {
    const id  = usePathname()

    return (
        <ApolloProvider client={client}>
            <EditTodo id={id.split("/")[3]} />
        </ApolloProvider>
    );
};

export default TodoListId;