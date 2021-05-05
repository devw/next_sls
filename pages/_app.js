import { useEffect } from "react";
import Head from "next/head";
import { AppProvider as PolarisProvider, Frame } from "@shopify/polaris";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import "@shopify/polaris/dist/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserProvider } from "@contexts/User/User.context";
import { ConfigurationProvider } from "@contexts/Configuration/Configuration.context";
import { DesignPopupProvider } from "@contexts/DesignPopup/DesignPopup.context";
import { isDev } from "@utils/Env.utils";
import AlfredLayout from "@components/AlfredLayout/AlfredLayout.component";
import { appWithTranslation } from "next-i18next";
import { launchServices } from "@utils/Services.utils";
import { useRouter } from "next/dist/client/router";

export default appWithTranslation(function Application({
    Component,
    pageProps,
}) {
    const router = useRouter();
    const polarisTranslations = require(`@shopify/polaris/locales/${router.locale}.json`);
    const appBridgeConfig = {
        apiKey: process.env.SHOPIFY_API_KEY,
        shopOrigin: isDev() ? process.env.DEV_SHOPIFY_STORE : router.query.shop,
        forceRedirect: true,
    };

    useEffect(() => {
        launchServices();
    }, []);

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
});
