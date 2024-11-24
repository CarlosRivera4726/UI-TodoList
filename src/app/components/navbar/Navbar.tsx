import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";


async function ResponsiveAppBar() {
  const session = await getServerSession(authOptions);

  console.log(session)

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold uppercase tracking-wide">
              TODO LIST APP
            </a>
          </div>

          {/* Menú en pantallas grandes */}
          {!session?.user ? (
            <>
              <div className="hidden md:flex space-x-4">
                <Link className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition duration-300" href="/pages/auth/login">
                  Iniciar Sesión
                </Link>
                <Link className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-700 transition-transform transform hover:scale-105" href="/pages/auth/register">
                  Registrarse
                </Link>
              </div>
            </>) : (
            <>
              <div className="hidden md:flex space-x-6">
                <a
                  href="/"
                  className="hover:text-gray-200 transition-colors duration-300"
                >
                  Inicio
                </a>
                <Link
                  href="/pages/todo"
                  className="hover:text-gray-200 transition-colors duration-300"
                >
                  Tareas
                </Link>
                <Link
                  href="/api/auth/signout"
                  className="hover:text-gray-200 transition-colors duration-300"
                >
                  Cerrar Sesión
                </Link>
              </div>
            </>
          )

          }

          {/* Botones */}


        </div>
      </nav>


    </div>

  )

}
export default ResponsiveAppBar;
