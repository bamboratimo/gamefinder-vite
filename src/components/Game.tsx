import { Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import React, { useContext } from "react";
import GameContext from "../GameContext";

interface Props {
    onClick: () => void;
    game: Favorite | Game;
}

const heartStyle = {
    "&:hover": {
        fontSize: "1.6rem",
        color: "#D2122E",
    },
    position: "absolute",
    top: 5,
    left: 5,
    color: "red",
    fontSize: "1.2rem",
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

    const checkIfFavorite: Favorite | undefined = favorites.find(
        (favorite: Favorite) => favorite.game.id === game.id
    );

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
                backgroundColor: "#202020",
                width: "300px",
                minHeight: "300px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "20px",
                "&:hover": {
                    transform: "scale(1.02)",
                },
                cursor: "pointer",
                position: "relative",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    marginTop: "auto",
                    marginBottom: "auto",
                    padding: "10px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    fontSize: "24px",
                }}
            >
                {game.name}
            </Typography>
            {checkIfFavorite ? (
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
                        const newGame = {
                            game: game,
                            images: game.images,
                            defaultId: defaultId,
                        };
                        setFavorites([...favorites, newGame]);
                        setDefaultId(defaultId + 1);

                        e.stopPropagation();
                    }}
                    sx={heartStyle}
                />
            )}

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
