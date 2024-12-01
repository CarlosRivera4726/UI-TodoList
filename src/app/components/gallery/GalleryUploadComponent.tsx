"use client"
import { INSERT_IMAGE } from "@/app/constants/const.gallery";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Alert, Box, TextField } from "@mui/material";
import { IGallery } from "@/app/interfaces/IGallery";
import CheckIcon from '@mui/icons-material/Check';
import { HEADERS } from "@/app/constants/const";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const GalleryUpload = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState<string | null | undefined>(null);
    const [success, setSuccess] = useState<string | null | undefined>(null);




    const onSubmit = handleSubmit(async data => {
        
        const newImage: IGallery = {
            name: data.name,
            url: data.url,
            userId: localStorage.getItem('userId') || ''
        }

        const { data: imageRegistered } = await axios.post('https://stirred-ladybird-74.hasura.app/v1/graphql',
            {
                query: INSERT_IMAGE,
                variables: {
                    name: newImage.name,
                    url: newImage.url,
                    UserId: newImage.userId,
                }
            },
            {
                headers: HEADERS
            });
            console.log(imageRegistered)
        if (imageRegistered.errors) {
            setError(imageRegistered.errors[0].message);
            return;
        }

        if(imageRegistered.data.insert_Gallery_one){
            setSuccess('Se ha guardado la imagen correctamente.');
            reset();
        }


    })

    return (
        <div className='flex flex-col text-center text-3xl gap-20'>
            {success && (
                 <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    {success}
                </Alert>
            )}
            <h1 className='uppercase text-4xl font-bold'>Subir Link Foto</h1>

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
                    {errors.name && (
                        <span className="text-sm text-red-600 mt-1 block">
                            Este campo es requerido
                        </span>
                    )}
                    <TextField
                        id="name"
                        label="Nombre de la imagen"
                        {...register('name', { required: true })}
                    />
                </div>
                <div>
                    {errors.url && (
                        <span className="text-sm text-red-600 mt-1 block">
                            Este campo es requerido.
                        </span>
                    )}
                    <TextField
                        id="url"
                        label="Dirección de la imagen"
                        {...register('url', { required: true })}
                    />
                </div>
                <div className=' flex justify-center gap-3'>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-lg rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-700 transition-transform transform" type='submit'> <FileUploadIcon /> Subir Imagen</button>
                </div>
            </Box>
        </div>
    );
}



export default GalleryUpload;