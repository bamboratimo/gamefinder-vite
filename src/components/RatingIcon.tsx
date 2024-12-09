import exceptional from "../assets/ratings/exceptional.png";
import recommended from "../assets//ratings/recommended.png";
import meh from "../assets/ratings/meh.png";
import skip from "../assets/ratings/skip.png";

interface Props {
    rating: number;
}

const RatingIcon: React.FC<Props> = ({ rating }): React.ReactElement => {
    const icon: any =
        rating === 5
            ? exceptional
            : rating === 4
            ? recommended
            : rating === 3
            ? meh
            : rating === 1
            ? skip
            : null;
    return (
        <img
            src={icon}
            style={{
                width: "25px",
                height: "25px",
                alignSelf: "start",
                marginBottom: "5px",
                visibility: rating ? "initial" : "hidden",
            }}
        />
    );
};

export default RatingIcon;
