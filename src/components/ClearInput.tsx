import ClearIcon from "@mui/icons-material/Clear";

interface Props {
    textRef: any;
    setSearchWord: (arg0: string) => void;
    searchWord: any;
}

const ClearInput: React.FC<Props> = ({
    textRef,
    setSearchWord,
    searchWord,
}): React.ReactElement => {
    return (
        <ClearIcon
            onClick={() => {
                console.log(textRef.current.value);
                setSearchWord({ ...searchWord, current: "" });
                textRef.current.focus();
            }}
            sx={{
                color: "darkgray",
                position: "relative",
                right: 40,
                fontSize: "1rem",
            }}
        />
    );
};

export default ClearInput;
