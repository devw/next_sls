import "../styles/globals.css";
import Head from "next/head";
import { AppProvider as PolarisProvider, Frame } from "@shopify/polaris";
import { DesignPopupProvider } from "@contexts/DesignPopup/DesignPopup.context";
import AlfredLayout from "@components/AlfredLayout/AlfredLayout.component";
import { ConfigurationProvider } from "@contexts/Configuration/Configuration.context";
import { UserProvider } from "@contexts/User/User.context";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import { isDev } from "@utils/Env.utils";

import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    router.locale = "it";
    const polarisTranslations = require(`@shopify/polaris/locales/${router.locale}.json`);
    const appBridgeConfig = {
        apiKey: process.env.SHOPIFY_API_KEY,
        shopOrigin: isDev() ? process.env.DEV_SHOPIFY_STORE : router.query.shop,
        forceRedirect: true,
    };
    return (
        <PolarisProvider
            features={{ newDesignLanguage: true }}
            i18n={polarisTranslations}
        >
            <AppBridgeProvider config={appBridgeConfig}>
                <Frame>
                    <UserProvider>
                        <ConfigurationProvider>
                            <DesignPopupProvider>
                                <Head>
                                    <script src="https://alfred-script-tags.s3-eu-west-1.amazonaws.com/cookiebot-popup.js" />
                                </Head>

                                <AlfredLayout
                                    withLanguageSelect={false}
                                    withAnnouncement={false}
                                >
                                    <Component {...pageProps} />
                                </AlfredLayout>
                            </DesignPopupProvider>
                        </ConfigurationProvider>
                    </UserProvider>
                </Frame>
            </AppBridgeProvider>
        </PolarisProvider>
    );
};

export default appWithTranslation(MyApp);
