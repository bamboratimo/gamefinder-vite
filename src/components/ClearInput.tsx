import ClearIcon from "@mui/icons-material/Clear";

interface Props {
    textRef: any;
}

const ClearInput: React.FC<Props> = ({ textRef }): React.ReactElement => {
    return (
        <ClearIcon
            onClick={() => {
                textRef.current.value = "";
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
