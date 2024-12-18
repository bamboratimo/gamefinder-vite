import { Container, Typography } from "@mui/material";
import HeartButton from "./HeartButton";
import CloseButton from "./CloseButton";

interface Props {
    gameDetails: Gamedetails;
    onClick: () => void;
    alreadyFavorite: Favorite | undefined;
}

const GameHeader: React.FC<Props> = ({
    gameDetails,
    onClick,
    alreadyFavorite,
}) => {
    return (
        <Container
            maxWidth={false}
            sx={{
                justifyItems: "center",
                alignItems: "center",
                display: "grid",
                gridTemplateColumns: "1fr 3fr 1fr",
                backgroundColor: "#2b2b2b",
            }}
        >
            <HeartButton
                gameDetails={gameDetails}
                alreadyFavorite={alreadyFavorite}
            />

            <Typography
                sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "2rem",
                    fontFamily: "Poppins",
                    maxWidth: "500px",
                }}
            >
                {gameDetails.game.name}
            </Typography>
            <CloseButton onClick={onClick} />
        </Container>
    );
};

export default GameHeader;
