"use client"
import { IGallery } from "@/app/interfaces/IGallery";
import { Alert, Box, Button, Modal, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UPDATE_IMAGE } from "@/app/constants/const.gallery";
import axios from "axios";
import { HEADERS } from "@/app/constants/const";

interface GalleryEditModalComponentProps {
    show: boolean;
    gallery: IGallery;
    onClose: () => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const GalleryEditModalComponent = (props: GalleryEditModalComponentProps) => {
    const [srcSet, setSrcSet] = useState(props.gallery.url);
    const [name, setName] = useState(props.gallery.name);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState<string | null | undefined>(null);
    const [success, setSuccess] = useState<string | null | undefined>(null);

    const handleChange = (e: any) => {
        setSrcSet(e.target.value);
    }


    const onSubmit = handleSubmit(async data => {

        const newImage: IGallery = {
            name: data.name,
            url: data.url,
            userId: localStorage.getItem('userId') || ''
        }

        const { data: imageRegistered } = await axios.post('https://stirred-ladybird-74.hasura.app/v1/graphql',
            {
                query: UPDATE_IMAGE,
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

        if (imageRegistered.data.insert_Gallery_one) {
            setSuccess('Se ha guardado la imagen correctamente.');
            reset();
        }
    })



    return (
        <>
            <Modal
                open={props.show}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <section>
                        <img
                            srcSet={`${srcSet}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${srcSet}?w=164&h=164&fit=crop&auto=format`}
                            alt={name || "Gallery image"}
                            style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                        />
                    </section>
                    <div className="m-14">
                        <div className='flex flex-col text-center text-3xl gap-20'>
                            {success && (
                                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                    {success}
                                </Alert>
                            )}
                            <h1 className='uppercase text-4xl font-bold'>Editar Foto</h1>

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
                                        value={name}
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
                                        value={srcSet}
                                        {...register('url', { required: true })}
                                    />
                                </div>
                                <div className=' flex justify-center gap-3'>
                                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-lg rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-700 transition-transform transform" type='submit'> <FileUploadIcon /> Subir Imagen</button>
                                </div>
                            </Box>
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    )
}


export default GalleryEditModalComponent;