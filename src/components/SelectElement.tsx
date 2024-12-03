import { Box, FormControl, InputLabel, Select } from "@mui/material";

interface Props {
    onChange: any;
    value: string;
    marginLeft: string;
    id: string;
    label: string;
    text: string;
    children: any;
}

const SelectElement: React.FC<Props> = ({
    onChange,
    value,
    marginLeft,
    id,
    label,
    text,
    children,
}) => {
    return (
        <Box
            sx={{
                maxWidth: "200px",
                marginLeft: `${marginLeft}px`,
            }}
        >
            <FormControl fullWidth sx={{ color: "red" }}>
                <InputLabel
                    sx={{
                        color: "white",
                        background: "black",
                        width: "75px",
                        textAlign: "center",
                    }}
                    id="sort-label"
                >
                    {text}
                </InputLabel>
                <Select
                    size="small"
                    onChange={onChange}
                    id={id}
                    defaultValue="default"
                    labelId={`${id}-label`}
                    label={label}
                    sx={{ background: "white" }}
                    value={value}
                >
                    {children}
                </Select>
            </FormControl>
        </Box>
    );
};
export default SelectElement;
