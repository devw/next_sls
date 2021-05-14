import { useCallback, useContext, useState } from 'react';
import { Layout, Card, CalloutCard, TextField, Link, Icon } from '@shopify/polaris'
import { useTranslation } from 'next-i18next'
import { ConfigurationContext } from '@contexts/Configuration/Configuration.context'
import { DesignPopupContext } from '@contexts/DesignPopup/DesignPopup.context'
import FAQ from './FAQ/FAQ.component'
import Scopes from './Scopes/Scopes.component'
import { ColorsMajor } from '@shopify/polaris-icons'

export default function CookieConsentDialog({ faq }) {
  const { t } = useTranslation('common')
  const { update, data } = useContext(ConfigurationContext)
  const { setShowDesignPopup } = useContext(DesignPopupContext)
  const isPopupEnabled = data?.is_popup_enabled
  const togglePopupLabel = isPopupEnabled ? t('Actions.disable') : t('Actions.enable')
  const hideCookiebotCard = data?.hide_cookiebot_card
  const pageIds = data?.shopify_page_ids

  const togglePopupEnabled = useCallback(async () => {
    update('is_popup_enabled', !isPopupEnabled)
  }, [isPopupEnabled])

  const handleDismissCookiebotCard = () => {
    update('hide_cookiebot_card', true)
  }

  return (
    <Layout>
      {!hideCookiebotCard && (
        <Layout.Section>
          <CalloutCard
            title="Why cookiebot ?"
            illustration="https://www.cookiebot.com/img/logo_contrast.svg"
            primaryAction={{content: 'Create a cookiebot account', external: true}}
            secondaryAction={{content: 'Watch the installation guide', url: 'https://www.youtube.com/embed/HSNVattm0lc', external: true}}
            onDismiss={handleDismissCookiebotCard}
          >
            We use the Cookiebot engine in our app in order to make compliance as easy as a click. Our app integrates seamlessly with Cookiebot allowing your store to be compliant with respect to :cookie consent, cookie monitoring and cookie control.
          </CalloutCard>
        </Layout.Section>
      )}

      <Layout.Section>
        <Card
          primaryFooterAction={{content: togglePopupLabel, onAction: togglePopupEnabled, destructive: isPopupEnabled}}
          secondaryFooterActions={[{content: 'Customize', onAction: () => setShowDesignPopup(true), icon: (
            <Icon source={ColorsMajor} />
          )}]}
        >
          <Card.Header title="Cookiebot integration" />
          <Card.Section>
            <TextField
              label='Domain Group ID'
              placeholder='3257405e-c127-4bd0-a185-74673ebb8622'
              helpText="For more information, check the FAQ section below."
              labelAction={{content: 'Create a cookiebot account', url: 'https://www.google.com/'}}
              value={data?.domain_group_id}
              onChange={(value) => update('domain_group_id', value)}
            />
          </Card.Section>
          <Card.Section title="Availability zone(s)">
            <Scopes />
          </Card.Section>
          <Card.Section title="FAQ">
            <FAQ contents={faq} />
          </Card.Section>
          {pageIds?.cookie_declaration && (
            <Card.Section title="Important" subdued>
              Don't forget to add the <Link url={data?.links?.cookie_declaration} external>Cookie Declaration page</Link> to the footer of your website. 
            </Card.Section>
          )}
          <Card.Section title="STILL HAVE SOME QUESTIONS ?">
            Head to our <Link url="https://alfred-apps-cookiebot-compliance-suite.crisp.help/" external>Help Center</Link> where we try to explain everything in much more detail.
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  )
}
