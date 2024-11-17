"use client"
import { LOGIN_QUERY } from '@/app/interfaces/const';
import { IUser } from '@/app/interfaces/IUser';
import { useQuery } from '@apollo/client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const LoginView = () => {
    // CONTROL DE VISUALIZACION DE CONTRASEÑA
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const { loading, error, data } = useQuery(LOGIN_QUERY, {
        variables: {
            _eq: username,
            _eq1: password
        }
    })

    const validateInputUsername = () => {

        return username === "" ? false : true;
    }
    const validateInputPassword = () => {

        return password === "" ? false : true;
    }


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Username: ', username);
        console.log('Password: ', password);
        if (loading) return (<p>Loading ...</p>)
        if (error) return (<p>{error.message}</p>)
        console.log('Data: ', data.Users);
        data.Users.map((user: IUser) => {
            localStorage.setItem('id', user.id ? user.id : "");
            localStorage.setItem('user', user.username);
            localStorage.setItem('fullname', user.fullname);
            localStorage.setItem('email', user.email);
        })

        router.push('/pages/todo');

    }

    const handleRegister = () => {
        router.replace('/pages/register');
    }


    return (
        <div className='flex flex-col text-center text-3xl gap-24'>
            <h1>Login</h1>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <div className='justify-center content-center '>
                    <TextField
                        error={!validateInputUsername()}
                        id="outlined-error"
                        label="Username"
                        helperText="Debe ingresar un Username valido"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            error={!validateInputPassword()}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </div>
                <div className=' flex justify-center gap-3'>
                    <Button variant="contained" onClick={handleSubmit}>Login</Button>

                    <Button variant="outlined" onClick={handleRegister}>Registrarse</Button>
                </div>
            </Box>
        </div>
    );
}
export default LoginView;