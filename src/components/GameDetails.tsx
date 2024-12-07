import { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Skeleton,
    Container,
    Typography,
    useMediaQuery,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";

import { useNavigate, useParams } from "react-router-dom";

import GameHeader from "./GameHeader";
import GameContext from "../GameContext";
import AccordionElement from "./AccordionElement";

const GameDetails: React.FC = (): React.ReactElement => {
    const Mobile = useMediaQuery("(max-width: 950px)");

    const { apikey, favorites } = useContext(GameContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [gameDetails, setGameDetails] = useState<Gamedetails>({
        game: {},
        ready: false,
        images: [],
    });

    const [loaded, setLoaded] = useState<boolean>(false);

    const alreadyFavorite: Favorite | undefined = favorites.find(
        (item: Favorite) => item.game.id === Number(id)
    );

    const started: React.MutableRefObject<boolean> = useRef(false);

    const onLoad = (): void => {
        setLoaded(true);
    };

    // const cropImage = (word: string): string => {
    //     const newString = `${word.slice(0, 27)}/crop/600/400${word.slice(27)}`;
    //     return newString;
    // };

    const getData = async () => {
        try {
            const gameConnection: Response = await fetch(
                `https://api.rawg.io/api/games/${Number(id)}?key=${apikey}`
            );
            const gameData: Promise<any> = await gameConnection.json();

            const imageConnection: Response = await fetch(
                `https://api.rawg.io/api/games/${Number(
                    id
                )}/screenshots?key=${apikey}`
            );
            const imageData = await imageConnection.json();
            setGameDetails({
                ...gameDetails,
                game: gameData,
                images: imageData.results,
                ready: true,
            });
        } catch (e: unknown) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!started.current) {
            window.scrollTo(0, 0);
            getData();
        }
        return () => {
            started.current = true;
        };
    }, []);

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                backgroundColor: "black",
                paddingTop: Mobile ? "125px" : "80px",
            }}
        >
            {gameDetails.ready ? (
                <GameHeader
                    gameDetails={gameDetails}
                    alreadyFavorite={alreadyFavorite}
                    onClick={() => {
                        navigate(-1);
                    }}
                />
            ) : (
                <Skeleton
                    sx={{
                        width: "100vw",
                        height: "10vh",
                        bgcolor: "grey.900",
                        marginBottom: "10px",
                    }}
                    variant="text"
                />
            )}
            <Container
                className="wrapper"
                disableGutters
                maxWidth={false}
                sx={{
                    display: "grid",
                    gridTemplateColumns: Mobile ? "1fr" : "1fr 1fr",
                    padding: "0 10px",
                    alignItems: "start",
                    gap: "20px",
                    height: Mobile ? "90vh" : "initial",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    {!gameDetails.ready ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <Skeleton
                                sx={{
                                    width: "100%",
                                    height: "35vh",
                                    bgcolor: "grey.900",
                                }}
                                variant="rectangular"
                            />
                        </Box>
                    ) : !gameDetails.game.background_image ? (
                        <ImageIcon sx={{ fontSize: "200px", color: "white" }} />
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                style={{
                                    marginBottom: "10px",
                                    width: "100%",
                                    maxWidth: "800px",
                                    height: loaded ? "auto" : "40vh",
                                }}
                                // src={cropImage(
                                //     gameDetails.game.background_image
                                // )}
                                src={gameDetails.game.background_image}
                                alt="kuva pelistä"
                                onLoad={onLoad}
                            />
                        </Box>
                    )}

                    {gameDetails.ready ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "12px",
                                width: "100%",
                                paddingBottom: "20px",
                            }}
                        >
                            <AccordionElement gameDetails={gameDetails} />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    color: "white",
                                    width: "100%",
                                    gap: "20px",
                                    justifyContent: "center",
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
                        </Box>
                    ) : (
                        <Skeleton
                            sx={{
                                marginTop: "20px",
                                width: "50vw",
                                height: "35vh",
                                bgcolor: "grey.900",
                            }}
                            variant="rectangular"
                        />
                    )}
                </Box>

                {!gameDetails.ready ? (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridAutoRows: "min-content",
                            gap: "10px",
                            background: "black",
                            justifySelf: "center",
                        }}
                    >
                        <Skeleton
                            sx={{
                                width: "25vw",
                                height: "220px",
                                bgcolor: "grey.900",
                            }}
                            variant="rectangular"
                        />
                        <Skeleton
                            sx={{
                                width: "25vw",
                                height: "220px",
                                bgcolor: "grey.900",
                            }}
                            variant="rectangular"
                        />
                        <Skeleton
                            sx={{
                                width: "25vw",
                                height: "220px",
                                bgcolor: "grey.900",
                            }}
                            variant="rectangular"
                        />
                        <Skeleton
                            sx={{
                                width: "25vw",
                                height: "220px",
                                bgcolor: "grey.900",
                            }}
                            variant="rectangular"
                        />
                    </Box>
                ) : (
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
                        {gameDetails.images.map(
                            (kuva: Image, index: number) => {
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
                            }
                        )}
                    </Box>
                )}
            </Container>
        </Container>
    );
};

export default GameDetails;
