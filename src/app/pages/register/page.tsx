"use client"
import RegisterView from "@/app/components/register/Register";
import client from "@/db/conexion";
import { ApolloProvider } from "@apollo/client";

const RegisterPage = () => {
    return (
        <div>
            <h1>Register Page</h1>
            <ApolloProvider client={client}>
                <RegisterView />
            </ApolloProvider>
        </div>
    );
}
export default RegisterPage;