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
        <Box
            onClick={onClick}
            sx={{
                textTransform: "none",
                backgroundColor: "#2d2d2d",
                width: "300px",
                minHeight: "300px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                "&:hover": {
                    transform: "scale(1.02)",
                },
                cursor: "pointer",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    height: "100%",
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
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontFamily: "Poppins",
                            fontWeight: "700",
                            fontSize: "24px",
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
            </Box>

            {game.background_image ? (
                <img
                    style={{
                        maxWidth: "300px",
                    }}
                    src={cropImage(game.background_image)}
                    alt="kuva pelistä"
                />
            ) : (
                <ImageIcon
                    sx={{
                        fontSize: "200px",
                    }}
                />
            )}
        </Box>
    );
};

export default Game;
