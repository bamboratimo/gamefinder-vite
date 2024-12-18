import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
    gameDetails: Gamedetails;
}

const AccordionElement: React.FC<Props> = ({
    gameDetails,
}): React.ReactElement => {
    return (
        <Accordion
            sx={{
                backgroundColor: "#151515",
                color: "white",
                width: "100%",
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            >
                <Typography
                    sx={{
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Kuvaus
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                    style={{
                        fontSize: "0.8rem",
                    }}
                >
                    {gameDetails.game.description_raw}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionElement;
