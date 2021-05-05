import "../styles/globals.css";
import Head from "next/head";
import { AppProvider as PolarisProvider, Frame } from "@shopify/polaris";
import { DesignPopupProvider } from "@contexts/DesignPopup/DesignPopup.context";
import AlfredLayout from "@components/AlfredLayout/AlfredLayout.component";

import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    router.locale = "it";
    const polarisTranslations = require(`@shopify/polaris/locales/${router.locale}.json`);
    return (
        <PolarisProvider
            features={{ newDesignLanguage: true }}
            i18n={polarisTranslations}
        >
            <Frame>
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
            </Frame>
        </PolarisProvider>
    );
};

export default appWithTranslation(MyApp);
