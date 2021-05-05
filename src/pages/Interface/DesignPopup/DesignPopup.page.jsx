import { useContext, useEffect, useState, useCallback } from 'react'
import { Layout, Icon, Card, Button, TextField, RangeSlider, MediaCard, VideoThumbnail, Select, FormLayout } from '@shopify/polaris';
import { UserContext } from '@contexts/User/User.context'
import { useTranslation } from 'react-i18next'
import { ConfigurationContext } from '@contexts/Configuration/Configuration.context'
import ColorPicker from '@components/ColorPicker/ColorPicker.component'
import { ViewMinor, HideMinor } from '@shopify/polaris-icons'
import _ from 'lodash'

export default function DesignPopup() {
  const { t } = useTranslation('common')
  const { user } = useContext(UserContext)
  const { data, update } = useContext(ConfigurationContext)
  const [previewVisible, setPreviewVisible] = useState(true)

  const positionOptions = [
    {label: 'Center', value: 'center'},
    {label: 'Top left', value: 'top-left'},
    {label: 'Top right', value: 'top-right'},
    {label: 'Bottom left', value: 'bottom-left'},
    {label: 'Bottom right', value: 'bottom-right'}
  ]
  
  const updateStyles = (key, value) => {
    update(`popup.stylesheet.${key}`, value)
  }

  const toggleShowPreview = () => {
    if (window.AlfredCookiebot.display) {
      window.AlfredCookiebot.hide()
    } else {
      window.AlfredCookiebot.show()
    }
  }

  useEffect(() => {
    window.AlfredCookiebot.loadCustomConfiguration(data.popup)
  }, [data.popup])

  useEffect(() => {
    window.AlfredCookiebot.show()
    return () => {
      window.AlfredCookiebot.hide()
    }
  })

  return (
    <Layout>
      <Layout.AnnotatedSection
        title={t('DesignPopup.annotated.title')}
        description={
          <Layout>
            <Layout.Section>
              <p>
                {t('DesignPopup.annotated.description')} (
                  <Button plain url={`https://${user.shopOrigin}?alfred_preview`} external>
                    {t('DesignPopup.annotated.storePreviewLink')}
                  </Button>
                ).
              </p>
            </Layout.Section>
            
            <Layout.Section>
              <Button fullWidth onClick={toggleShowPreview}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Icon source={ViewMinor} />
                  <div style={{marginLeft: 10}}>Toggle preview</div>
                </div>
              </Button>
            </Layout.Section>

            <div style={{marginTop: 40}}>
              <Layout.Section>
                <MediaCard
                  title={t('DesignPopup.annotated.mediaCard.title')}
                  description={t('DesignPopup.annotated.mediaCard.description')}
                  portrait
                >
                  <VideoThumbnail
                    videoLength={80}
                    thumbnailUrl="https://images.unsplash.com/photo-1527685216219-c7bee79b0089?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
                  />
                </MediaCard>
              </Layout.Section>
            </div>
          </Layout>
        }
      >
        <Card>
          <Card.Section>
            <FormLayout>
              <TextField
                label="Image url"
                value={data?.popup?.image_url}
                onChange={(value) => update('popup.image_url', value)}
              />

              <Select
                label={t('DesignPopup.styles.position.label')}
                helpText={t('DesignPopup.styles.position.helpText')}
                options={positionOptions}
                onChange={value => update('popup.position', value)}
                value={data?.popup?.position}
              />
            </FormLayout>
          </Card.Section>
          <Card.Section title="Colors">
            <FormLayout>
              <FormLayout.Group>
                <ColorPicker
                  label="Primary color"
                  value={data?.popup?.stylesheet?.['color--primary']}
                  onChange={(value) => updateStyles('color--primary', value)}
                />

                <ColorPicker
                  label="Secondary color"
                  value={data?.popup?.stylesheet?.['color--secondary']}
                  onChange={(value) => updateStyles('color--secondary', value)}
                />
              </FormLayout.Group>

              <FormLayout.Group>
                <ColorPicker
                  label="Background color"
                  value={data?.popup?.stylesheet?.['color--background']}
                  onChange={(value) => updateStyles('color--background', value)}
                />

                <ColorPicker
                  label="Border color"
                  value={data?.popup?.stylesheet?.['color--border']}
                  onChange={(value) => updateStyles('color--border', value)}
                />
              </FormLayout.Group>
            </FormLayout>
          </Card.Section>
          <Card.Section title="Other styles">
            <FormLayout>
              <RangeSlider
                label={`${t('DesignPopup.styles.fontSize.label')} (${data?.popup?.stylesheet?.['font-size']})`}
                min={10}
                max={24}
                step={2}
                output
                value={parseInt(data?.popup?.stylesheet?.['font-size'] || 0)}
                onChange={(value) => updateStyles('font-size', value + 'px')}
              />

              <RangeSlider
                label={`Padding (${data?.popup?.stylesheet?.['padding-offset']})`}
                min={0}
                max={100}
                step={5}
                output
                value={parseInt(data?.popup?.stylesheet?.['padding-offset'] || 0)}
                onChange={(value) => updateStyles('padding-offset', value + 'px')}
              />
          
              <RangeSlider
                label={`Border radius (${data?.popup?.stylesheet?.['border-radius']})`}
                min={0}
                max={30}
                step={5}
                output
                value={parseInt(data?.popup?.stylesheet?.['border-radius'] || 0)}
                onChange={(value) => updateStyles('border-radius', value + 'px')}
              />
            </FormLayout>
          </Card.Section>
          <Card.Section title={t('DesignPopup.links.title')}>
            <FormLayout>
              <TextField
                label={t('DesignPopup.links.privacyPolicy.label')}
                helpText={t('DesignPopup.links.privacyPolicy.helpText')}
                placeholder={t('DesignPopup.links.privacyPolicy.placeholder')}
                inputMode="url"
                value={data?.popup?.links?.privacy_policy}
                onChange={value => update('popup.links.privacy_policy', value)}
              />
            </FormLayout>
          </Card.Section>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  )
}