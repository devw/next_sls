import { useState, useContext, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { OptionList, TextStyle } from '@shopify/polaris'
import ScopeLabel from './ScopeLabel/ScopeLabel.component'
import styles from './Scopes.module.css'
import { ConfigurationContext } from '@contexts/Configuration/Configuration.context'


export default function Scopes() {
  const { t } = useTranslation('common')
  const { data, update } = useContext(ConfigurationContext)
  const [selectedScopes, setSelectedScopes] = useState(data?.scopes || [])
  const everywhereEnabled = selectedScopes.includes('everywhere')

  const scopes = [
    {value: 'everywhere', label: 'Everywhere - Alway display the dialog - for all users.'},
    {value: 'only_gdpr', disabled: everywhereEnabled, label: <ScopeLabel label="RGPD Zone (European Union) - The dialog will only be displayed for user browsing the site within the EU" />},
    {value: 'only_lgpd', disabled: everywhereEnabled, label: <ScopeLabel label="LGPD - Only display for usres browsing the site in Brazil." />},
    {value: 'only_ccpa', disabled: everywhereEnabled, label: <ScopeLabel label="CCPA - Only display for usres browsing the site in California." />}
  ]

  useEffect(() => {
    update('scopes', selectedScopes)
  }, [selectedScopes])

  return (
    <>
      <div className={styles.container}>
        <OptionList
          options={scopes}
          selected={selectedScopes}
          onChange={setSelectedScopes}
          allowMultiple
        />
      </div>

      <TextStyle variation="subdued">
        Uncheck "Everywhere" in order to fine pick individual zones.
      </TextStyle>
    </>
  )
}