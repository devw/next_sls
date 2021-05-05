import { useCallback, useEffect, useState, useContext } from "react";
import { Page, Layout, Icon, Stack, DisplayText, Button } from "@shopify/polaris";
import SaveBar from '@components/AppBridge/SaveBar/SaveBar.component'
import { MobileBackArrowMajor, ThemeEditMajor, PopularMajor } from "@shopify/polaris-icons";
import { UserContext } from '@contexts/User/User.context'
import { DesignPopupContext } from "@contexts/DesignPopup/DesignPopup.context";
import { ConfigurationContext } from '@contexts/Configuration/Configuration.context'
import Recommendations from '@components/Recommendations/Recommendations.component'
import { useTranslation } from 'next-i18next'
import DesignPopup from './DesignPopup/DesignPopup.page';
import ProgressBar from '@components/ProgressBar/ProgressBar.component';
import TabsPanel from './TabsPanel/TabsPanel.component'
import styles from './Interface.module.css'
import { withCommas } from '@utils/Global.utils'

export default function Interface({ faq }) {
  const { t } = useTranslation('common')
  const { plan } = useContext(UserContext)
  const { edited, save, saving, discard } = useContext(ConfigurationContext)
  const { showDesignPopup, setShowDesignPopup } = useContext(DesignPopupContext)

  const totalSessions = 0
  const maxSessions = 10000
  const progressPercent = totalSessions / maxSessions * 100

  const pageBody = showDesignPopup ? <DesignPopup /> : <TabsPanel faq={faq} />

  const secondaryActions = showDesignPopup ? [
    {
      content: <div style={{marginLeft: 8}}>Back</div>,
      onAction: () => setShowDesignPopup(false),
      icon: MobileBackArrowMajor
    }
  ] : []

  return (
    <Page
      title={
        <Stack alignment="center">
          <DisplayText size="large">Welcome home</DisplayText>
          <div onClick={() => window.location.href = '/plans'} className="Polaris-Badge" style={{background: plan?.color || 'grey', cursor: 'pointer', color: 'white', border: '1px solid white'}}>
            {plan?.label}
          </div>
        </Stack>
      }
      secondaryActions={secondaryActions}
    >
      <SaveBar
        showBar={edited}
        showSaveLoading={saving}
        save={[save]}
        discard={[discard]}
      />

      <Layout>
        <Layout.Section>
          {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20}}>
            <ProgressBar
              title={
                <Stack alignment="center" spacing="tight">
                  <div style={{width: 15, height: 15}}><Icon source={PopularMajor} /></div>
                  <div>{withCommas(totalSessions)} / {withCommas(maxSessions)} {t('Home.sessionsQuota')}</div>
                </Stack>
              }
              subtitle={
                <Button plain url="/plans">{t('Home.upgrade')}</Button>
              }
              progress={progressPercent}
              warning={progressPercent >= 70 && progressPercent < 90}
              alert={progressPercent >= 90}
            />
          </div> */}

          <div className={styles.divider} />

          <div>{pageBody}</div>
        </Layout.Section>

        {/* <Layout.Section>
          <Recommendations />
        </Layout.Section> */}
      </Layout>
    </Page>
  )
}