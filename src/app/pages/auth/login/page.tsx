"use client"
import LoginView from "@/app/components/login/Login";
import client from "@/db/conexion";
import { ApolloProvider } from "@apollo/client";

const LoginPage = () => {
    return (
        <div>
                <ApolloProvider client={client}>
                    <LoginView />
                </ApolloProvider>
        </div>
    );
}
export default LoginPage;