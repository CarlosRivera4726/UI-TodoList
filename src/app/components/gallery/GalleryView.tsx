import { GET_GALLERY } from "@/app/constants/const.gallery";
import { useQuery } from "@apollo/client";
import { Alert, CircularProgress, ImageList, ImageListItem } from "@mui/material";

interface GalleryProps {
    userId: string | null | undefined;
}

const GalleryView = (props: GalleryProps) => {
    // Aseguramos que la consulta solo se ejecute si userId es válido
    const { loading, error, data } = useQuery(GET_GALLERY, {
        variables: { _eq: props.userId },
        skip: !props.userId, // Skip la consulta si no hay userId
    });

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error: {error.message}</Alert>;

    if (!data || !data.Gallery || data.Gallery.length === 0) {
        return <p>No images found.</p>;
    }

    return (
        <section className="mt-10">
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>

                {data.Gallery.map((image: any) => (
                    <ImageListItem key={`${image.id}-${image.url}`}>

                        <img
                            srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
                            alt={image.name || "Gallery image"}
                            style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </section>
    );
};

export default GalleryView;
