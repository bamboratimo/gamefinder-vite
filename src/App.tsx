import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Games from "./components/Games";
import Favorites from "./components/Favorites";
import Menu from "./components/Menu";
import GameDetails from "./components/GameDetails";
import GameContext from "./GameContext";

const App: React.FC = (): React.ReactElement => {
    const [gamesList, setGamesList] = useState<Game>({
        pages: {
            next: "",
            previous: "",
        },
        games: [],
        ready: false,
        error: false,
        skeletons: false,
    });
    const [defaultId, setDefaultId] = useState<number>(0);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [filtered, setFiltered] = useState<Favorite[]>([...favorites]);
    const [loading, setLoading] = useState<boolean>(true);
    const [favoriteSort, setFavoriteSort] = useState<string>("default");
    const [filterString, setFilterString] = useState<string>("default");
    const [searchSort, setSearchSort] = useState<string>("default");
    const [searchWord, setSearchWord] = useState<string>("");
    const apikey: string = "1e7def9ddd864094acb19cb25ff3eb45";

    const sharedValue = {
        gamesList,
        setGamesList,
        defaultId,
        setDefaultId,
        favorites,
        setFavorites,
        filtered,
        setFiltered,
        favoriteSort,
        setFavoriteSort,
        filterString,
        setFilterString,
        searchSort,
        setSearchSort,
        apikey,
    };

    const started: React.MutableRefObject<boolean> = useRef(false);

    const search = async (): Promise<void> => {
        try {
            window.scrollTo(0, 0);
            setGamesList({
                ...gamesList,
                ready: false,
                error: false,
                skeletons: true,
            });
            const connection: Response = await fetch(
                `https://api.rawg.io/api/games?key=${apikey}&search=${searchWord}&ordering=${searchSort}`
            );

            const data = await connection.json();
            setGamesList({
                ...gamesList,
                pages: data,
                games: data.results,
                ready: true,
                skeletons: false,
            });

            console.log(data);
        } catch (e: unknown) {
            console.log(e);
            setGamesList({ ...gamesList, error: true });
        }
    };

    useEffect(() => {
        if (!started.current) {
            if (
                localStorage.getItem("favorites") &&
                localStorage.getItem("defaultId") &&
                localStorage.getItem("favoriteSort")
            ) {
                setFavorites(
                    JSON.parse(String(localStorage.getItem("favorites")))
                );
                setDefaultId(
                    JSON.parse(String(localStorage.getItem("defaultId")))
                );
                setFavoriteSort(
                    JSON.parse(String(localStorage.getItem("favoriteSort")))
                );
            }
            setLoading(false);
        }

        return () => {
            started.current = true;
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        localStorage.setItem("defaultId", JSON.stringify(defaultId));
        localStorage.setItem("favoriteSort", JSON.stringify(favoriteSort));
    }, [favorites, defaultId, favoriteSort]);

    useEffect(() => {
        search();
    }, [searchSort]);

    return (
        <GameContext.Provider value={sharedValue}>
            <Menu
                favorites={favorites}
                setSearchWord={setSearchWord}
                search={search}
                searchSort={searchSort}
                setSearchSort={setSearchSort}
                searchWord={searchWord}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Games
                            gamesList={gamesList}
                            setGamesList={setGamesList}
                            searchSort={searchSort}
                            setSearchSort={setSearchSort}
                        />
                    }
                />
                <Route path="/games/:id" element={<GameDetails />} />
                <Route
                    path="/favorites"
                    element={<Favorites loading={loading} />}
                />
                <Route path="/favorites/:id" element={<GameDetails />} />
            </Routes>
        </GameContext.Provider>
    );
};

export default App;
