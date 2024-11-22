"use client"
import { HEADERS, REGISTER_USER } from '@/app/interfaces/const';
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
    const [repeatPassword, setRepeatpassword] = useState('');
    const router = useRouter();

    

    const validateInputUsername = () => { return username === "" ? false : true; }
    const validateInputFullname = () => { return fullname === "" ? false : true; }
    const validateInputEmail= () => { return email === "" ? false : true; }
    const validateInputPassword = () => { return password === "" ? false : true; }
    const validateInputRepeatPassword = () => { return repeatPassword === "" ? false : true; }
    
    
   

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const isValid = validateInputUsername() && validateInputFullname() && validateInputEmail() && validateInputPassword() && validateInputRepeatPassword();
        if (!isValid) {
            alert('Debe completar todos los campos');
            return;
        }

        if (password !== repeatPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const newUser: IUser = {
            username: username,
            password: await bcrypt.hash(password, 10),
            email: email,
            fullname: fullname
        }


        const {data} = await axios.post('https://stirred-ladybird-74.hasura.app/v1/graphql', 
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
                headers:HEADERS
            });

        console.log("data from register: ", data);
        if(data) {
            router.push("/pages/auth/login") 
        }
        router.refresh()
    

    }

    const handleBack = () => {
        router.replace('/pages/auth/login');
    }


    return (
        <div className='flex flex-col text-center text-3xl gap-24'>
            <h1 className='uppercase text-4xl font-bold'>Register</h1>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        error={!validateInputFullname()}
                        id="outlined-error-helper-text-fullname"
                        label="Fullname"
                        helperText="Debe ingresar un nombre valido"
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        error={!validateInputUsername()}
                        id="outlined-error-helper-text-username"
                        label="Username"
                        helperText="Debe ingresar un username valido"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        error={!validateInputEmail()}
                        id="outlined-error-helper-text-email"
                        label="Email"
                        helperText="Debe ingresar un email valido."
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-repeat-password">Repeat Password</InputLabel>
                        <OutlinedInput
                            error={!validateInputRepeatPassword()}
                            id="outlined-adornment-repeat-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setRepeatpassword(e.target.value)}
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
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-lg rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-700 transition-transform transform" onClick={handleSubmit}>Registrarse</button>

                    <Button variant="outlined" onClick={handleBack}>Volver</Button>
                </div>
            </Box>
        </div>
    );
}
export default RegisterView;