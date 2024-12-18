import ClearIcon from "@mui/icons-material/Clear";

interface Props {
    textRef: any;
    setSearchWord: (arg0: string) => void;
}

const ClearInput: React.FC<Props> = ({
    textRef,
    setSearchWord,
}): React.ReactElement => {
    return (
        <ClearIcon
            onClick={() => {
                console.log(textRef.current.value);
                //textRef.current.value = "";
                setSearchWord("");
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
