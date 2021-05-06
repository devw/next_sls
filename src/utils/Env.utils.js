export function isLocalhost() {
    return (
        location.hostname === "localhost" || location.hostname === "127.0.0.1"
    );
}

export function isDev() {
    return process.env.NODE_ENV === "development";
}

export const appId = isDev() ? process.env.DEV_BOX_ID : process.env.APP_ID;

export const alfredDomain = "https://alfred.dev-kastorstudio.com";
