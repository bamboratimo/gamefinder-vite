import playstation from "../assets/platforms/playstation.svg";
import xbox from "../assets/platforms/xbox.svg";
import nintendo from "../assets/platforms/nintendo.svg";
import pc from "../assets/platforms/windows.svg";
import mac from "../assets/platforms/mac.svg";
import android from "../assets/platforms/android.svg";
import ios from "../assets/platforms/ios.svg";
import linux from "../assets/platforms/linux.svg";
import sega from "../assets/platforms/sega.svg";
import neogeo from "../assets/platforms/neo-geo.svg";
import atari from "../assets/platforms/atari.svg";
import commodore from "../assets/platforms/commodore-amiga.svg";
import web from "../assets/platforms/web.svg";
import { Box } from "@mui/material";

interface Props {
    platforms: any;
}

const PlatformIcons: React.FC<Props> = ({ platforms }): React.ReactElement => {
    const checkPlatform = (platform: string): any => {
        let value = null;
        if (platform === "playstation") {
            value = playstation;
        }
        if (platform === "xbox") {
            value = xbox;
        }
        if (platform === "nintendo") {
            value = nintendo;
        }
        if (platform === "pc") {
            value = pc;
        }
        if (platform === "mac") {
            value = mac;
        }
        if (platform === "android") {
            value = android;
        }
        if (platform === "ios") {
            value = ios;
        }
        if (platform === "linux") {
            value = linux;
        }
        if (platform === "sega") {
            value = sega;
        }
        if (platform === "neo-geo") {
            value = neogeo;
        }
        if (platform === "atari") {
            value = atari;
        }
        if (platform === "commodore-amiga") {
            value = commodore;
        }
        if (platform === "web") {
            value = web;
        }
        return value;
    };
    return (
        <Box sx={{ display: "flex", alignItems: "end", gap: "8px" }}>
            {platforms.map((platform: any) => {
                return (
                    <img
                        key={platform.platform.id}
                        src={checkPlatform(platform.platform.slug)}
                        style={{
                            width: "1emx",
                            height: "1em",
                        }}
                    />
                );
            })}
        </Box>
    );
};

export default PlatformIcons;
