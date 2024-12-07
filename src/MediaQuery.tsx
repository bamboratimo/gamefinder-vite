import useMediaQuery from "@mui/material/useMediaQuery";

export default function SimpleMediaQuery() {
    const matches = useMediaQuery("(max-width:950px)");

    return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
