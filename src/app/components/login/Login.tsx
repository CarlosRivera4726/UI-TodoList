"use client"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';


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
    const [error, setError] = useState<string | null | undefined>(null);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async data => {
        console.log(data);
        const res = await signIn('credentials', {
            username: username,
            password: password,
            redirect: false
        })

        console.log(res)
        if (res?.error || !res?.ok) {
            setError(res?.error)
        } else {
            router.push('/pages/todo')
            router.refresh()
        }
    })

    const handleRegister = () => {
        router.replace('/pages/auth/register');
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-[90%] max-w-lg">
                <h1 className="font-bold text-4xl text-center text-gray-700 uppercase mb-6">Login</h1>

                {error && (
                    <p className="bg-red-600 text-white text-center text-lg p-3 rounded mb-4">
                        {error}
                    </p>
                )}
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { width: '100%' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={onSubmit}
                >
                    {/* Username Input */}
                    <div className="mb-4">
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            {...register('username', { required: true })}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && (
                            <span className="text-sm text-red-600 mt-1 block">
                                Este campo es requerido
                            </span>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Password"
                                {...register('password', { required: true })}
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
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {errors.password && (
                            <span className="text-sm text-red-600 mt-1 block">
                                Este campo es requerido
                            </span>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300 w-full"
                        >
                            INGRESAR
                        </button>
                        <Button
                            variant="outlined"
                            onClick={handleRegister}
                            className="w-full"
                        >
                            Registrarse
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}
export default LoginView;