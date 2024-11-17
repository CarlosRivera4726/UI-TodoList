"use client"
import LoginView from "@/app/components/login/Login";
import client from "@/db/conexion";
import { ApolloProvider } from "@apollo/client";

const LoginPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <ApolloProvider client={client}>
            <LoginView />
            </ApolloProvider>
        </div>
    );
}
export default LoginPage;