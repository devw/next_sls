import { Tabs, Card } from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'
import CookieConsentDialog from '@pages/Interface/CookieConsentDialog/CookieConsentDialog.page'
import GlobalConfiguration from '@pages/Interface/GlobalConfiguration/GlobalConfiguration.page'
import RegulationRequests from '@pages/Interface/RegulationRequests/RegulationRequests.page'
import DeletionRequests from '@pages/Interface/DeletionRequests/DeletionRequests.page'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TabsPanel({ faq }) {
  const { t } = useTranslation('common')
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex)
  }, [])

  const tabs = [
    {
      id: 'cookiebot-consent-dialog',
      content: t('CookieConsentDialog.tabTitle'),
      panelID: 'cookie-consent-dialog',
      component: <CookieConsentDialog cookiebotSettings={{}} faq={faq} />
    },
    {
      id: 'global-configuration',
      content: t('GlobalConfiguration.tabTitle'),
      panelID: 'global-configuration-content',
      component: <GlobalConfiguration />
    },
    {
      id: 'regulation-equests',
      content: t('RegulationRequests.tabTitle'),
      panelID: 'regulation-requests-content',
      component: <RegulationRequests faqContents={faq} />
    },
    {
      id: 'deletion-requests',
      content: t('DeletionRequests.tabTitle'),
      panelID: 'deletion-requests-content',
      component: <DeletionRequests faqContents={faq} />
    }
  ];

  return (
    <Card>
      <TitleBar title={tabs[selected].content} />

      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section>
          {tabs[selected].component}
        </Card.Section>
      </Tabs>
    </Card>
  )
}