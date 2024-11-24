import { getServerSession } from "next-auth";
import axios from "axios";
import TodoList from "@components/TodoList/TodoList";
import { GET_TODO_LIST_BY_USERID, GET_USER_INFO, HEADERS } from "@/app/interfaces/const";

export default async function TodoListViewServer() {
  // Obtén la sesión del usuario
  const session = await getServerSession();

  if (!session) {
    return <p className="text-center text-red-600">Por favor, inicia sesión para ver tu lista de tareas.</p>;
  }

  try {
    // Fetch TODOs del usuario autenticado
    const { data: userData } = await axios.post(
      "https://stirred-ladybird-74.hasura.app/v1/graphql",
      {
        query: GET_USER_INFO,
        variables: {
          _eq: session.user?.email, // Usa el identificador adecuado
        },
      },
      {
        headers: HEADERS,
      }
    );
    const id = userData.data.Users[0].id;
    const {data: todoData } = await axios.post(
        "https://stirred-ladybird-74.hasura.app/v1/graphql",
        {
            query: GET_TODO_LIST_BY_USERID,
            variables: {
            _eq: id, // Usa el identificador adecuado
            },
        },
        {
            headers: HEADERS,
        }
        );
    
    console.log("DATA: ", todoData)

    /*const todos = userData.data.Todos;*/

    // Pasa los TODOs al componente cliente
    return <TodoList todos={todoData.data.Todos} userName={session.user?.name} userId={id} />;
  } catch (error) {
    console.error("Error fetching TODOs:", error);
    return <p className="text-center text-red-600">Error al cargar la lista de tareas.</p>;
  }
}
