import { Box, Button, Container, MenuItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import Game from "./Game";
import SelectElement from "./SelectElement";
import { useContext, useEffect } from "react";
import GameContext from "../GameContext";

interface Props {
    loading: boolean;
}

const Favorites: React.FC<Props> = ({ loading }): React.ReactElement => {
    const {
        favorites,
        setFavorites,
        favoriteSort,
        setFavoriteSort,
        filtered,
        setFiltered,
        filterString,
        setFilterString,
    } = useContext(GameContext);

    const navigate = useNavigate();

    const favoritesOrfiltered: Favorite[] =
        filterString !== "default" ? filtered : favorites;

    const sortFavorites = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        if (e.target.value === "-metacritic") {
            filtered.sort(
                (a: Favorite, b: Favorite) =>
                    Number(b.game.metacritic) - Number(a.game.metacritic)
            );
            favorites.sort(
                (a: Favorite, b: Favorite) =>
                    Number(b.game.metacritic) - Number(a.game.metacritic)
            );
        }

        if (e.target.value === "name") {
            filtered.sort((a: Favorite, b: Favorite) => {
                const nameA = a.game.name.toUpperCase();
                const nameB = b.game.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            favorites.sort((a: Favorite, b: Favorite) => {
                const nameA = a.game.name.toUpperCase();
                const nameB = b.game.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        }

        if (e.target.value === "-rating") {
            filtered.sort(
                (a: Favorite, b: Favorite) =>
                    Number(b.game.rating) - Number(a.game.rating)
            );
            favorites.sort(
                (a: Favorite, b: Favorite) =>
                    Number(b.game.rating) - Number(a.game.rating)
            );
        }

        if (e.target.value === "released") {
            filtered.sort(
                (a: Favorite, b: Favorite) =>
                    new Date(a.game.released).getTime() -
                    new Date(b.game.released).getTime()
            );
            favorites.sort(
                (a: Favorite, b: Favorite) =>
                    new Date(a.game.released).getTime() -
                    new Date(b.game.released).getTime()
            );
        }

        if (e.target.value === "default") {
            filtered.sort(
                (a: Favorite, b: Favorite) =>
                    Number(a.defaultId) - Number(b.defaultId)
            );
            favorites.sort(
                (a: Favorite, b: Favorite) =>
                    Number(a.defaultId) - Number(b.defaultId)
            );
        }

        setFavoriteSort(e.target.value);
        setFavorites([...favorites]);
        setFiltered([...filtered]);
        console.log(favorites);
    };

    const filterGames = (e: any) => {
        if (e.target.value === "default") {
            setFiltered([]);
        }
        if (e.target.value === "meta") {
            setFiltered(
                [...favorites].filter((favorite: Favorite) => {
                    return Number(favorite.game.metacritic > 90);
                })
            );
        }
        setFilterString(e.target.value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    columnGap: "40px",
                    rowGap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <SelectElement
                        onChange={sortFavorites}
                        value={favoriteSort}
                        marginLeft="0"
                        id="sort"
                        label="Lajittele"
                        text="Lajittele"
                    >
                        <MenuItem value="default">Oletus</MenuItem>
                        <MenuItem value="name">Nimi</MenuItem>
                        <MenuItem value="released">Julkaisuaika</MenuItem>
                        <MenuItem value="-metacritic">Metacritic</MenuItem>
                        <MenuItem value="-rating">Arvosana</MenuItem>
                    </SelectElement>

                    <SelectElement
                        onChange={filterGames}
                        value={filterString}
                        marginLeft="0"
                        id="filter"
                        label="Suodata"
                        text="Suodata"
                    >
                        <MenuItem value="default">Kaikki</MenuItem>
                        <MenuItem value="meta">metacritic yli 90</MenuItem>
                    </SelectElement>

                    <Button
                        sx={{
                            background: "ghostwhite",
                            color: "#000",
                            "&:hover": {
                                background: "grey",
                            },
                            maxHeight: "40px",
                            padding: "10px",
                        }}
                        variant="contained"
                        onClick={() => {
                            setFavorites([]);
                        }}
                    >
                        Poista kaikki
                    </Button>
                    <Button
                        component={Link}
                        to={"/"}
                        sx={{
                            background: "ghostwhite",
                            color: "#000",
                            "&:hover": {
                                background: "grey",
                            },
                            maxHeight: "40px",
                        }}
                    >
                        Takaisin
                    </Button>
                </Box>
                <Typography variant="h3" color="white">
                    Suosikit
                </Typography>
            </Box>
            {loading ? null : favorites.length === 0 ? (
                <Typography
                    sx={{
                        color: "#fff",
                        fontSize: "4vw",
                        alignSelf: "center",
                    }}
                >
                    Et ole vielä lisännyt suosikkeja
                </Typography>
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, 300px)",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    {favoritesOrfiltered.map((favorite: Favorite) => {
                        return (
                            <Game
                                onClick={() => {
                                    navigate(`/favorites/${favorite.game.id}`);
                                }}
                                game={favorite.game}
                                key={favorite.game.id}
                            />
                        );
                    })}
                </Box>
            )}
        </Container>
    );
};

export default Favorites;
