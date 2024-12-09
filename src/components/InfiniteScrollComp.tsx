import { CSSProperties } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

interface Props {
    gamesList: Game;
    nextPage: () => void;
    children: React.ReactElement;
}

const override: CSSProperties = {
    margin: "0 auto",
};

const InfiniteScrollComp: React.FC<Props> = ({
    children,
    gamesList,
    nextPage,
}): React.ReactElement => {
    return (
        <InfiniteScroll
            dataLength={gamesList.games.length}
            next={nextPage}
            hasMore={Boolean(gamesList.pages.next)}
            loader={<ClipLoader color="white" cssOverride={override} />}
            style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {children}
        </InfiniteScroll>
    );
};
export default InfiniteScrollComp;
