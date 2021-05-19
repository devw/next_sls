import { useContext } from 'react'
import { Layout, Card, Stack, Button, Checkbox, DisplayText, TextField, Select } from '@shopify/polaris'
import { useTranslation } from 'next-i18next'
import { UserContext } from '@contexts/User/User.context'
import { ConfigurationContext } from '@contexts/Configuration/Configuration.context'
import EmailNotifications from './EmailNotifications/EmailNotifications.component'
import ProxyPages from './ProxyPages/ProxyPages.component'

import _ from 'lodash'

export default function GlobalConfiguration() {
  const { t } = useTranslation('common')
  const { data, update } = useContext(ConfigurationContext)

  const languages = [
    {label: t('GlobalConfiguration.section1.language.options.en'), value: 'en'},
    {label: t('GlobalConfiguration.section1.language.options.fr'), value: 'fr'},
    {label: t('GlobalConfiguration.section1.language.options.de'), value: 'de'},
    {label: t('GlobalConfiguration.section1.language.options.es'), value: 'es'},
    {label: t('GlobalConfiguration.section1.language.options.it'), value: 'it'},
  ]

  return (
    <Layout>
      <Layout.AnnotatedSection
        title="Global configuration"
        description={
          <div>
            <p>Edit the settings to meet your specific requirements for your shop.</p>

            <div style={{marginTop: 20}}>
              <Stack spacing="tight">
                <Button
                  plain
                  fullWidth
                  external="true"
                  url={data?.links?.privacy_policy}
                  disabled={!data?.links?.privacy_policy}
                >
                  View Privacy Data Request page
                </Button>
              </Stack>
            </div>
          </div>
        }
      >
        <Card>
          <Card.Section title="General">
            <Layout>
              <Layout.Section>
                <Select
                  label="Default language"
                  options={languages}
                  onChange={value => update('lang', value)}
                  value={data?.lang}
                  helpText={data?.automatic_lang && "You've chosen to enable the automatic language detection, disable this option to set a specific language."}
                  disabled={data?.automatic_lang}
                />
              </Layout.Section>

              <Layout.Section>
                <Checkbox
                  label="Automatically detect language"
                  checked={data?.automatic_lang}
                  onChange={checked => update('automatic_lang', checked)}
                />
              </Layout.Section>

              <Layout.Section>
                <Checkbox
                  label="Mark requests as done automatically"
                  helpText="It allows to automatically mark all of the user requests (access, portability and rectification) as DONE."
                  checked={data?.automatic_done_requests}
                  onChange={checked => update('automatic_done_requests', checked)}
                />
              </Layout.Section>
            </Layout>
          </Card.Section>

          <Card.Section title="Admin notifications">
            <TextField
              label="Admin email"
              placeholder=""
              helpText="This email will be used to notify admin according the list of notifications below."
              inputMode="text"
              value={data?.email_alerts?.custom_to_email}
              onChange={(value) => update('email_alerts.custom_to_email', value)}
            />
          </Card.Section>

          <Card.Section title="Notifications">
            <EmailNotifications />
          </Card.Section>
          <Card.Section title="Request Pages Settings">
            <ProxyPages />
          </Card.Section>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  )
}
