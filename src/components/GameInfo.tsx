import { Box, Typography } from "@mui/material";

interface Props {
    gameDetails: Gamedetails;
}

const GameInfo: React.FC<Props> = ({ gameDetails }): React.ReactElement => {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                color: "white",
                width: "100%",
                gap: "20px",
                justifyContent: "center",
                backgroundColor: "black",
                paddingBottom: "20px",
            }}
        >
            <Box
                sx={{
                    flexBasis: "40%",
                }}
            >
                <Typography variant="h5" color="gray">
                    Alustat
                </Typography>

                {gameDetails.game.platforms.map(
                    (item: Favorite, index: number) => {
                        return (
                            <Typography key={index}>
                                {item.platform.name}
                            </Typography>
                        );
                    }
                )}
            </Box>
            <Box sx={{ flexBasis: "40%" }}>
                <Typography variant="h5" color="gray">
                    Julkaistu
                </Typography>
                <Typography>
                    {gameDetails.game.released
                        ? new Date(
                              gameDetails.game.released
                          ).toLocaleDateString()
                        : `Julkaisutietoa ei saatavilla`}
                </Typography>
            </Box>
            <Box sx={{ flexBasis: "40%" }}>
                <Typography variant="h5" color="gray">
                    Kehittäjä
                </Typography>
                <Typography>
                    {gameDetails.game.developers.length > 0
                        ? `${gameDetails.game.developers[0].name}`
                        : `Pelin kehittäjä ei tiedossa`}
                </Typography>
            </Box>
            <Box sx={{ flexBasis: "40%" }}>
                <Typography variant="h5" color="gray">
                    Metacritic
                </Typography>
                <Typography>
                    {gameDetails.game.metacritic
                        ? `${gameDetails.game.metacritic}`
                        : `Ei saatavilla`}
                </Typography>
            </Box>
        </Box>
    );
};

export default GameInfo;
