"use client"
import { Box, Tab, Tabs } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from "react";
import GalleryComponent from "./GalleryComponent";
import { ApolloProvider } from "@apollo/client";
import client from "@/db/conexion";
import GalleryUpload from "./GalleryUploadComponent";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const GalleryView = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <h1 className="text-black text-center font-bold uppercase mt-5 text-5xl mb-10">GALERIA</h1>

            <section>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex flex-row items-center justify-center">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab icon={<ImageIcon />} label="Imagenes" {...a11yProps(0)} />
                            <Tab icon={<UploadFileIcon />} label="Upload" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <section className="flex flex-row items-center justify-center">
                        <CustomTabPanel value={value} index={0}>
                            <ApolloProvider client={client}>
                                <GalleryComponent userId={localStorage.getItem("userId")}/>
                            </ApolloProvider>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <GalleryUpload />
                        </CustomTabPanel>
                    </section>
                </Box>

            </section>

        </>
    )
}


export default GalleryView;