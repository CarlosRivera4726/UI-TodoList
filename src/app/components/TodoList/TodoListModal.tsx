"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { INSERT_TODO, STATUS } from "@/app/constants/const";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 790,
  high: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface TransitionsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TodoListModal({ open, onClose }: TransitionsModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState<string | null | undefined>(null);
  const router = useRouter();

  const [addTodo, { loading }] = useMutation(INSERT_TODO);

  const onSubmit = handleSubmit(async (todoData) => {
    console.log(todoData);
    const userId = localStorage.getItem("userId");

    try {
      const { data } = await addTodo({
        variables: {
          title: todoData.title,
          description: todoData.description,
          status: todoData.status,
          UserID: userId,
        },
      });

      console.log(data);
      router.refresh();
      onClose();
    } catch (errorMut) {
      console.error(errorMut);
      setError((errorMut as Error).message);
    }
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} className="rounded-lg">
          <section className="m-32">
            <h2 className="text-2xl text-center text-black font-semibold mb-8">
              AGREGAR TAREA
            </h2>

            {error && (
              <p className="bg-red-600 text-white text-center text-lg p-3 rounded mb-4">
                {error}
              </p>
            )}

            <section className="flex flex-col gap-4">
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                {errors.title && (
                  <span className="text-sm text-red-600 mt-1 block">
                    Este campo es requerido
                  </span>
                )}
                <TextField
                  style={errors.title ? { borderColor: "red" } : {}}
                  id="title"
                  label="Titulo"
                  variant="outlined"
                  value={title}
                  {...register("title", { required: true })}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.description && (
                  <span className="text-sm text-red-600 mt-1 block">
                    Este campo es requerido
                  </span>
                )}

                <TextField
                  id="description"
                  label="Descripcion"
                  variant="outlined"
                  value={description}
                  {...register("description", { required: true })}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {errors.status && (
                  <span className="text-sm text-red-600 mt-1 block">
                    Este campo es requerido
                  </span>
                )}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status ? status : STATUS[0].label}
                    label="Estado"
                    {...register("status", { required: true })}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {STATUS.map((item) => (
                      <MenuItem
                        className="text-black"
                        key={item.value}
                        value={item.label}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-semibold py-2"
                  disabled={loading}
                >
                  {loading ? "Guardando..." : "GUARDAR"}
                </button>
                <button
                  type="button"
                  className="bg-red-700 text-white font-semibold py-2"
                  onClick={onClose}
                >
                  CANCELAR
                </button>
              </form>
            </section>
          </section>
        </Box>
      </Fade>
    </Modal>
  );
}
