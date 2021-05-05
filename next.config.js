require("dotenv").config();
const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n,
    env: {
        PORT: process.env.PORT,
        DEV_BOX_ID: process.env.DEV_BOX_ID,
        DEV_SHOPIFY_STORE: process.env.DEV_SHOPIFY_STORE,
        APP_ID: process.env.APP_ID,
        APP_TITLE: process.env.APP_TITLE,
        SCOPES: process.env.SCOPES,
        ALFRED_API: process.env.ALFRED_API,
        APP_API: process.env.APP_API,
        APP_API_DEV: process.env.APP_API_DEV,
        CDN: process.env.CDN,
        SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY_DEV,
        CRISP_WEBSITE_ID: process.env.CRISP_WEBSITE_ID,
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
        FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
        HOTJAR_ID: process.env.HOTJAR_ID,
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push(
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader",
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 100000,
                        name: "[name].[ext]",
                    },
                },
            }
        );

        config.resolve.extensions.push(".tsx", ".ts", ".jsx", ".js", ".css");

        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: "empty",
            };
        }

        return config;
    },
};
