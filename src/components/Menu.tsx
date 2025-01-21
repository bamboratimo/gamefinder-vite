import { Badge, Box, Button, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import { useRef } from "react";

interface Props {
    favorites: Favorite[];
    searchWord: any;
    setSearchWord: (arg0: string) => void;
    search: () => void;
    searchSort: string;
    setSearchSort: (arg0: string) => void;
}

const Menu: React.FC<Props> = ({
    favorites,
    setSearchWord,
    search,
    searchWord,
}): React.ReactElement => {
    const navigate = useNavigate();

    const textRef = useRef<any>("");

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchWord({ ...searchWord, current: e.target.value });
    };
    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
                padding: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
                position: "fixed", //
                backgroundColor: "rgba(21,21,21,0.8)",
                top: 0,
                zIndex: 1,
                width: "100%",
            }}
        >
            <Button component={Link} to="/">
                <Typography
                    variant="h4"
                    sx={{
                        color: "yellow",
                        fontFamily: "monospace",
                    }}
                >
                    GameFinder300
                </Typography>
            </Button>
            <IconButton component={Link} to={"/favorites"}>
                <Badge
                    badgeContent={favorites.length}
                    color="primary"
                    sx={{ color: "white" }}
                >
                    <FavoriteIcon fontSize="large" sx={{ color: "red" }} />
                </Badge>
            </IconButton>
            <Box
                sx={{
                    display: "flex",
                    maxWidth: "80vw",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <SearchBar
                    searchWord={searchWord}
                    setSearchWord={setSearchWord}
                    search={search}
                    onChange={(e) => {
                        inputHandler(e);
                    }}
                    textRef={textRef}
                />
                <Button
                    variant="contained"
                    onClick={(e: any) => {
                        e.target.blur();
                        if (textRef.current.value === searchWord.previous) {
                            return;
                        }

                        search();
                        navigate("/");
                        setSearchWord({
                            ...searchWord,
                            previous: textRef.current.value,
                        });
                    }}
                    sx={{
                        height: "2.5rem",
                        marginLeft: "-20px",
                    }}
                >
                    Etsi
                </Button>
            </Box>
        </Box>
    );
};

export default Menu;
