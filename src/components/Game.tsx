import { Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useContext } from "react";
import GameContext from "../GameContext";
import RatingIcon from "./RatingIcon";
import PlatformIcons from "./PlatformIcons";

interface Props {
    onClick: () => void;
    game: Favorite | Game;
}

const heartStyle = {
    "&:hover": {
        color: "#D2122E",
    },
    color: "red",
    fontSize: "1.2rem",
    alignSelf: "start",
    margin: "5px",
};

const Game: React.FC<Props> = ({ onClick, game }): React.ReactElement => {
    const {
        favorites,
        setFavorites,
        filtered,
        setFiltered,
        defaultId,
        setDefaultId,
    } = useContext(GameContext);

    const cropImage = (word: string) => {
        const newString = `${word.slice(0, 27)}/crop/600/400${word.slice(27)}`;
        return newString;
    };

    const isFavorite: Favorite | undefined = favorites.find(
        (favorite: Favorite) => favorite.game.id === game.id
    );

    const addGame = (e: any): void => {
        const newGame = {
            game: game,
            images: game.images,
            defaultId: defaultId,
        };
        setFavorites([...favorites, newGame]);
        setDefaultId(defaultId + 1);

        e.stopPropagation();
    };

    const deleteGame = (): void => {
        const deletedFavorite: Favorite[] = [...favorites].filter(
            (favorite: Favorite) => favorite.game.id !== game.id
        );
        const deletedFiltered: Favorite[] = [...filtered].filter(
            (favorite: Favorite) => favorite.game.id !== game.id
        );
        setFavorites([...deletedFavorite]);
        setFiltered([...deletedFiltered]);
    };

    return (
        <Box onClick={onClick} sx={{ height: "fit-content" }}>
            <Box
                sx={{
                    textTransform: "none",
                    // width: "310px",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "20px",
                    "&:hover": {
                        transform: "scale(1.05)",
                    },
                    cursor: "pointer",
                    height: "fit-content",
                    overflow: "hidden",
                    transition: "transform .25s",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#2d2d2d",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        width: "100%",
                        alignItems: "center",
                        padding: "0 10px",
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon
                            onClick={(e) => {
                                deleteGame();
                                e.stopPropagation();
                            }}
                            sx={heartStyle}
                        />
                    ) : (
                        <FavoriteBorderIcon
                            onClick={(e) => {
                                addGame(e);
                            }}
                            sx={heartStyle}
                        />
                    )}

                    <Typography
                        // variant="h6"
                        style={{
                            textAlign: "center",
                            fontFamily: "Poppins",
                            fontSize: "1.5rem",
                        }}
                    >
                        {game.name}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignSelf: "start",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <RatingIcon rating={game.rating_top} />
                        <PlatformIcons platforms={game.parent_platforms} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "#2d2d2d",
                        width: "100%",
                    }}
                >
                    {game.background_image ? (
                        <img
                            style={{
                                //height: "200px",
                                width: "100%",
                                height: "auto",
                            }}
                            src={cropImage(game.background_image)}
                            alt="kuva pelistä"
                        />
                    ) : (
                        <ImageIcon
                            sx={{
                                fontSize: "200px",
                                width: "100%",
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Game;
