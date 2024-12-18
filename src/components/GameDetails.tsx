import { useContext, useEffect, useRef, useState } from "react";
import { Box, Skeleton, Container, useMediaQuery } from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";

import { useNavigate, useParams } from "react-router-dom";

import GameHeader from "./GameHeader";
import GameContext from "../GameContext";
import AccordionElement from "./AccordionElement";
import GameInfo from "./GameInfo";
import GameImages from "./GameImages";

const GameDetails: React.FC = (): React.ReactElement => {
    const Mobile = useMediaQuery("(max-width: 950px)");

    const { apikey, favorites } = useContext(GameContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [gameDetails, setGameDetails] = useState<Gamedetails>({
        game: {},
        ready: false,
        images: [],
        video: {},
    });

    const [loaded, setLoaded] = useState<boolean>(false);

    const alreadyFavorite: Favorite | undefined = favorites.find(
        (item: Favorite) => item.game.id === Number(id)
    );

    const started: React.MutableRefObject<boolean> = useRef(false);

    const onLoad = (): void => {
        setLoaded(true);
    };

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

            const videoConnection: Response = await fetch(
                `https://api.rawg.io/api/games/${Number(
                    id
                )}/movies?key=${apikey}`
            );
            const videoData = await videoConnection.json();

            setGameDetails({
                ...gameDetails,
                game: gameData,
                images: imageData.results,
                video: videoData.results[0],
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
                paddingRight: "10px",
                paddingLeft: "10px",
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
                    alignItems: "start",
                    justifyContent: "space-between",
                    gap: "10px",
                    height: Mobile ? "90vh" : "initial",
                }}
            >
                <Box>
                    {!gameDetails.ready ? (
                        <Skeleton
                            sx={{
                                width: "100%",
                                height: "35vh",
                                bgcolor: "grey.900",
                            }}
                            variant="rectangular"
                        />
                    ) : !gameDetails.game.background_image ? (
                        <ImageIcon sx={{ fontSize: "200px", color: "white" }} />
                    ) : (
                        <img
                            style={{
                                marginBottom: "10px",
                                width: "100%",
                                maxWidth: "900px",
                                height: loaded ? "auto" : "40vh",
                            }}
                            src={gameDetails.game.background_image}
                            alt="kuva pelistä"
                            onLoad={onLoad}
                        />
                    )}

                    {gameDetails.ready ? (
                        <Box>
                            <AccordionElement gameDetails={gameDetails} />
                            <GameInfo gameDetails={gameDetails} />
                        </Box>
                    ) : (
                        <>
                            <Skeleton
                                sx={{
                                    marginTop: "20px",
                                    width: "100%",
                                    height: "5vh",
                                    bgcolor: "grey.900",
                                }}
                                variant="rectangular"
                            />
                            <Skeleton
                                sx={{
                                    marginTop: "20px",
                                    width: "100%",
                                    height: "35vh",
                                    bgcolor: "grey.900",
                                }}
                                variant="rectangular"
                            />
                        </>
                    )}
                </Box>

                {!gameDetails.ready ? (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridAutoRows: "min-content",
                            gap: "10px",
                        }}
                    >
                        {Array(4)
                            .fill("")
                            .map((_, index: number) => {
                                return (
                                    <Skeleton
                                        key={index}
                                        sx={{
                                            bgcolor: "grey.900",
                                        }}
                                        variant="rectangular"
                                        width="25vw"
                                        height={220}
                                    />
                                );
                            })}
                    </Box>
                ) : (
                    <Box>
                        {gameDetails.video ? (
                            <video
                                controls
                                poster={gameDetails.video.preview}
                                style={{ maxWidth: "100%" }}
                            >
                                <source src={gameDetails.video.data[480]} />
                            </video>
                        ) : null}

                        <GameImages gameDetails={gameDetails} />
                    </Box>
                )}
            </Container>
        </Container>
    );
};

export default GameDetails;
