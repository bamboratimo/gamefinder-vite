import { Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useState } from "react";
import GameContext from "../GameContext";

interface Props {
    alreadyFavorite: Favorite | undefined;
    gameDetails: any;
}

const favoriteIconStyle = {
    color: "red",
    width: "28px",
    height: "28px",
};

const HeartButton: React.FC<Props> = ({
    alreadyFavorite,
    gameDetails,
}): React.ReactElement => {
    const {
        favorites,
        setFavorites,
        filtered,
        setFiltered,
        defaultId,
        setDefaultId,
    } = useContext(GameContext);
    const [text, setText] = useState<string>("");

    const addFavorite = (game: Gamedetails): void => {
        const newGame = {
            game,
            images: game.images,
            defaultId: defaultId,
        };
        setDefaultId(defaultId + 1);
        setFavorites([...favorites, newGame]);
        setFiltered([...filtered, newGame]);
    };

    const deleteGame = (): void => {
        const deletedFavorite: Favorite[] = [...favorites].filter(
            (favorite: Favorite) => favorite.game.id !== gameDetails.game.id
        );
        const deletedFiltered: Favorite[] = [...filtered].filter(
            (favorite: Favorite) => favorite.game.id !== gameDetails.game.id
        );
        setFavorites([...deletedFavorite]);
        setFiltered([...deletedFiltered]);
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {!alreadyFavorite ? (
                <IconButton
                    onClick={() => {
                        addFavorite(gameDetails.game);
                        setText("Lisätty");
                    }}
                >
                    <FavoriteBorderIcon sx={favoriteIconStyle} />
                </IconButton>
            ) : (
                <IconButton
                    onClick={() => {
                        deleteGame();
                        setText("Poistettu");
                    }}
                >
                    <FavoriteIcon sx={favoriteIconStyle} />
                </IconButton>
            )}

            <Typography
                sx={{
                    fontSize: "15px",
                    textAlign: "center",
                    width: "40px",
                }}
                color={"#fff"}
            >
                {text}
            </Typography>
        </Box>
    );
};
export default HeartButton;
