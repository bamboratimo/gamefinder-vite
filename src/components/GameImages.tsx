import { Box, useMediaQuery } from "@mui/material";

interface Props {
    gameDetails: any;
}

const GameImages: React.FC<Props> = ({ gameDetails }): React.ReactElement => {
    const Mobile = useMediaQuery("(max-width: 950px)");

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: Mobile ? "1fr" : "1fr 1fr",
                gridAutoRows: "min-content",
                gap: "10px",
                background: "black",
                justifySelf: "center",
            }}
        >
            {gameDetails.images.map((kuva: Image, index: number) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            maxWidth: "500px",
                            height: "100%",
                        }}
                    >
                        <img
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                            src={kuva.image}
                            alt="kuva pelistä"
                        />
                    </Box>
                );
            })}
        </Box>
    );
};

export default GameImages;
