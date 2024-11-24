import { LOGIN_QUERY } from '@/app/interfaces/const';
import client from '@/db/conexion';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { IUser } from '@/app/interfaces/IUser';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "******" }
            },
            async authorize(credentials, req) {
                const userFound = await client.query({
                    query: LOGIN_QUERY,
                    variables: {
                        _eq: credentials?.username,
                    }
                }).then((data) => {
                    if(data.data.Users.length > 0){
                        console.log(data.data.Users[0])
                        const users: IUser[] = data.data.Users;
                        return users[0];
                    }else{
                        return null;
                    }
                }).catch((error) => {
                    console.log(error);
                    return null;
                })

                if(!userFound) throw new Error("USER NOT FOUND!");
                if(!credentials) throw new Error("CREDENTIALS NOT FOUND!");

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                if(!matchPassword) throw new Error("WRONG PASSWORD!");
                
                return {
                    id: userFound.id || '',
                    name: userFound.fullname,
                    email: userFound.email,
                    image: userFound.id
                }
            }
        })
    ],
    pages: {
        signIn: "/pages/auth/login",
      }
}
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}; 