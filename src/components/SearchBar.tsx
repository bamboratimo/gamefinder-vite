import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClearInput from "./ClearInput";

interface Props {
    searchWord: any;
    setSearchWord: (arg0: string) => void;
    search: () => void;
    onChange: (arg0: any) => void;
    textRef: any;
}

const SearchBar: React.FC<Props> = ({
    searchWord,
    setSearchWord,
    search,
    onChange,
    textRef,
}): React.ReactElement => {
    const navigate = useNavigate();

    return (
        <>
            <TextField
                value={searchWord.current}
                inputRef={textRef}
                variant="outlined"
                size="small"
                placeholder="Etsi pelejä..."
                onChange={onChange}
                onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
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
                    }
                }}
                autoComplete="off"
                InputProps={{ sx: { color: "white" } }}
                sx={{
                    borderRadius: "10px",
                    backgroundColor: "#3f3f3f",
                    color: "#fff",
                    width: "500px",
                    maxWidth: "500px",
                    marginRight: "10px",
                    position: "relative",
                }}
            />
            <ClearInput
                textRef={textRef}
                setSearchWord={setSearchWord}
                searchWord={searchWord}
            />
        </>
    );
};

export default SearchBar;
