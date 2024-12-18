interface Game {
    [key: string]: any;
    pages: {
        next: string;
        previous: string;
    };
    games: any;
    ready: boolean;
    error: boolean;
    skeletons: boolean;
}

interface Favorite {
    [key: string]: any;
    id: number;
    name: string;
    background_image: string;
    description_raw: string;
    released: string;
    developers: any;
    metacritic: string;
    platforms: any[];
    defaultId: number;
}

interface Gamedetails {
    game: {
        [key: string]: any;
    };
    ready: boolean;
    images: Image[];
    video: any;
    defaultId?: number;
}
interface Image {
    image: string;
}

interface Platform {
    platform: { name: string };
}
