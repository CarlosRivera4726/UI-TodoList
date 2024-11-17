"use client"
import { ApolloProvider } from "@apollo/client";
import client from "@/db/conexion";
import TodoList from "@components/TodoList/TodoList";

export default function TodoListView() {
  return (
    <div>
      <main>
        <ApolloProvider client={client}>
          <TodoList />
        </ApolloProvider>
        </main>
    </div>
  );
}
