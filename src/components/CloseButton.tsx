import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    onClick: () => void;
}

const CloseButton: React.FC<Props> = ({ onClick }): React.ReactElement => {
    return (
        <IconButton onClick={onClick}>
            <CloseIcon
                sx={{
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    width: "28px",
                    height: "auto",
                }}
                fontSize="medium"
            />
        </IconButton>
    );
};
export default CloseButton;
