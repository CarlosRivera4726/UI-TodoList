"use client"
import { HEADERS, REGISTER_USER } from '@/app/constants/const';
import { IUser } from '@/app/interfaces/IUser';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import Visibility from '@mui/icons-material/Visibility';
import { VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useForm } from 'react-hook-form';

const RegisterView = () => {
    // CONTROL DE VISUALIZACION DE CONTRASEÑA
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const validateInputPassword = () => { return password === "" ? false : true; }
    const validateInputConfirmPassword = () => { return confirmPassword === "" ? false : true; }
    const [error, setError] = useState<string | null | undefined>(null);




    const onSubmit = handleSubmit(async data => {
        if (validateInputPassword() || validateInputConfirmPassword()) {
            if (password !== confirmPassword) {
                setError("Las contraseñas no coinciden")
                return;
            }
        }
        const newUser: IUser = {
            username: data.username,
            password: await bcrypt.hash(data.password, 10),
            email: data.email,
            fullname: data.fullname
        }

        const { data: userRegistered } = await axios.post('https://stirred-ladybird-74.hasura.app/v1/graphql',
            {
                query: REGISTER_USER,
                variables: {
                    fullname: newUser.fullname,
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password
                }
            },
            {
                headers: HEADERS
            });

        console.log("data from register: ", userRegistered);
        if (userRegistered) {
            router.push("/pages/auth/login")
        }
        router.refresh()


    })

    const handleBack = () => {
        router.replace('/pages/auth/login');
    }


    return (
        <div className='flex flex-col text-center text-3xl gap-24'>
            <h1 className='uppercase text-4xl font-bold'>Register</h1>

            {error && (
                <p className="bg-red-600 text-white text-center text-lg p-3 rounded mb-4">
                    {error}
                </p>
            )}
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <div>
                    {errors.fullname && (
                        <span className="text-sm text-red-600 mt-1 block">
                            Este campo es requerido
                        </span>
                    )}
                    <TextField
                        id="fullname"
                        label="Fullname"
                        {...register('fullname', { required: true })}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div>
                    {errors.username && (
                        <span className="text-sm text-red-600 mt-1 block">
                            Este campo es requerido
                        </span>
                    )}
                    <TextField
                        id="username"
                        label="Username"
                        {...register('username', { required: true })}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                </div>
                <div>
                    {errors.email && (
                        <span className="text-sm text-red-600 mt-1 block">
                            Este campo es requerido
                        </span>
                    )}
                    <TextField
                        className={errors.email ? 'border-red-600' : ''}
                        id="email"
                        label="Email"
                        {...register('email', { required: true })}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    {errors.password && (
                        <span className="text-sm text-red-600 mt-1 block">
                            Este campo es requerido
                        </span>
                    )}
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: true })}
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
                <div>
                    {errors.password && (
                        <span className="text-sm text-red-600 mt-1 block">
                            Este campo es requerido
                        </span>
                    )}
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="confirmPassword">Repeat Password</InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            {...register('confirmPassword', { required: true })}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            label="Validate Password"
                        />
                    </FormControl>

                </div>
                <div className=' flex justify-center gap-3'>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-lg rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-700 transition-transform transform" type='submit'>Registrarse</button>

                    <Button variant="outlined" onClick={handleBack}>Volver</Button>
                </div>
            </Box>
        </div>
    );
}
export default RegisterView;