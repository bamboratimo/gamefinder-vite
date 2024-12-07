import {
    Box,
    Container,
    Typography,
    SelectChangeEvent,
    Skeleton,
    MenuItem,
    useMediaQuery,
} from "@mui/material";
import { CSSProperties } from "react";
import Game from "./Game";
import { useNavigate } from "react-router-dom";
import SelectElement from "./SelectElement";

import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

interface Props {
    gamesList: Game;
    setGamesList: (arg0: Game) => void;
    searchSort: string;
    setSearchSort: (arg0: string) => void;
}
const override: CSSProperties = {
    margin: "0 auto",
};

const Games: React.FC<Props> = ({
    gamesList,
    setGamesList,
    searchSort,
    setSearchSort,
}): React.ReactElement => {
    const Mobile = useMediaQuery("(max-width: 950px)");
    const navigate = useNavigate();

    const sort = (e: SelectChangeEvent): void => {
        setSearchSort(e.target.value);
    };

    const nextPage = async (): Promise<void> => {
        try {
            setGamesList({ ...gamesList, ready: false, error: false });
            const connection: Response = await fetch(gamesList.pages.next);

            const data = await connection.json();
            setGamesList({
                ...gamesList,
                ready: true,
                pages: data,
                games: [...gamesList.games, ...data.results],
            });
        } catch (e: any) {
            console.log(e);
            setGamesList({ ...gamesList, error: true });
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                paddingTop: Mobile ? "125px" : "80px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: "30px",
                    alignSelf: "start",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <SelectElement
                    onChange={sort}
                    value={searchSort}
                    id="sort"
                    label="Lajittele"
                    marginLeft="50"
                    text="Lajittele"
                >
                    <MenuItem value="default">Oletus</MenuItem>
                    <MenuItem value="name">Nimi</MenuItem>
                    <MenuItem value="released">Julkaisuaika</MenuItem>
                    <MenuItem value="-metacritic">Metacritic</MenuItem>
                    <MenuItem value="-rating">Arvosana</MenuItem>
                </SelectElement>
                <Typography variant="h3" color="white">
                    Pelit
                </Typography>
            </Box>
            {gamesList.error ? (
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                    }}
                >
                    Virhe yhteydessä palvelimeen, yritä myöhemmin uudelleen
                </Typography>
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <InfiniteScroll
                        dataLength={gamesList.games.length}
                        next={nextPage}
                        hasMore={Boolean(gamesList.pages.next)}
                        // loader={
                        //     <h3 style={{ color: "white", textAlign: "center" }}>
                        //         Loading...
                        //     </h3>
                        // }
                        loader={
                            <ClipLoader color="white" cssOverride={override} />
                        }
                        style={{
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, 300px)",
                                gap: "20px",
                                justifyContent: "center",
                                marginBottom: "20px",
                            }}
                        >
                            {!gamesList.skeletons
                                ? gamesList.games.map((game: Game) => {
                                      return (
                                          <Game
                                              key={game.id}
                                              onClick={() => {
                                                  navigate(`/games/${game.id}`);
                                              }}
                                              game={game}
                                          />
                                      );
                                  })
                                : Array(20)
                                      .fill("")
                                      .map((_, index: number) => {
                                          return (
                                              <Skeleton
                                                  key={index}
                                                  sx={{
                                                      bgcolor: "grey.900",
                                                      borderRadius: "20px",
                                                  }}
                                                  variant="rectangular"
                                                  width={300}
                                                  height={300}
                                              ></Skeleton>
                                          );
                                      })}
                        </Box>
                    </InfiniteScroll>
                </Box>
            )}
        </Container>
    );
};

export default Games;
