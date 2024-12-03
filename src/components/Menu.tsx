import {
    Badge,
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useRef } from "react";

interface Props {
    favorites: Favorite[];
    searchWord: string;
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

    const textRef = useRef("");

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchWord(e.target.value);
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
                position: "sticky",
                backgroundColor: "rgba(21,21,21,0.8)",
                top: 0,
                zIndex: 1,
            }}
        >
            <Button component={Link} to="/">
                <Typography
                    variant="h4"
                    sx={{
                        color: "ghostwhite",
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
                <TextField
                    inputRef={textRef}
                    variant="outlined"
                    size="small"
                    onChange={inputHandler}
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Enter") {
                            if (searchWord === textRef.current) {
                                return;
                            }
                            search();
                            navigate("/");
                            textRef.current = searchWord;
                        }
                    }}
                    autoComplete="off"
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "ghostwhite",
                        width: "500px",
                        maxWidth: "500px",
                        marginRight: "10px",
                    }}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        if (searchWord === textRef.current) {
                            return;
                        }
                        search();
                        navigate("/");
                        textRef.current = searchWord;
                    }}
                    sx={{
                        height: "2.5rem",
                    }}
                >
                    Etsi
                </Button>
            </Box>
            <Outlet />
        </Box>
    );
};

export default Menu;
