import React, { useState, useContext, useCallback } from 'react'
import { Page, Layout, Modal, FormLayout, TextField, Icon, Banner, Button } from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react';
import { GiftCardMinor, CircleTickMajor, CircleDisabledMajor } from '@shopify/polaris-icons'
import { useAppBridge } from '@shopify/app-bridge-react'
import Notifier from '@utils/Notifier.utils'
import { UserContext } from '@contexts/User/User.context'
import Alfred from '@utils/Alfred.utils'
import { useTranslation } from 'react-i18next'

const styles = {
  features: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid lightgray',
    borderRadius: 10,
    padding: '15px 30px',
    minHeight: 400
  },
  feature: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '15px 25px'
  },
  plans: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 25
  },
  planCard: {
    position: 'relative',
    width: '100%',
    cursor: 'pointer',
    padding: '30px',
    borderRadius: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  planCard__price: {
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 10
  },
  planCard__current: {
    position: 'absolute',
    top: -10,
    right: -10
  }
}

const Features = ({ features }) => (
  <div>
    {features.map((feature, index) => (
      <div style={styles.feature} key={`feature-${index}`}>
        <p>{feature.label}</p>
        <div style={{display: 'block', opacity: feature.available ? 1 : .5 }}>
          {feature.available ? (
            <Icon
              source={CircleTickMajor}
              color="primary" />
          ) : (
            <Icon
              source={CircleDisabledMajor}
              color="inkLightest" />
          )}      
        </div>
      </div>
    ))}
  </div>
)

const PlanCard = ({ plan, updatePlan, current, selected }) => (
  <div style={{
    ...styles.planCard,
    border: selected
      ? '1px solid #008060'
      : '1px solid lightgray',
    background: selected
      ? '#008060'
      : 'transparent',
    color: selected
      ? 'white'
      : 'black',
  }} onClick={() => updatePlan(plan)}>
    {/* {current && (
      <div style={styles.planCard__current}>
        <Icon
          source={CircleTickMajor}
          color="light" />
      </div>
    )} */}

    <div style={{display: 'flex', alignItems: 'center'}}>
      <input type="radio" checked={selected} readOnly />
      <p style={{fontSize: 20, marginLeft: 20}}>
        {plan.label}
      </p>
    </div>

    <p>
      <span style={styles.planCard__price}>
        {plan.price}
      </span>
      <span>/mois</span>
    </p>
  </div>
)

export default function Plans({ plans }) {
  const { t } = useTranslation('common')
  const app = useAppBridge();
  const notifier = new Notifier(app);
  const { plan } = useContext(UserContext);
  const [showModalDiscount, setShowModalDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(plan);

  const confirmSubscription = async () => {
    const { status, data } = await Alfred.updateSubscription(0);

    if (status === "ok") {
      if (data.url) {
        window.location.href = data.url;
      }
    } else {
      notifier.error(t('Errors.UPDATE_PLAN'));
    }
  }

  const applyDiscount = useCallback(async () => {
    const { status, data } = await Alfred.applyDiscount(discountCode);
    console.log(status, data);

    if (status === "ok") {
      notifier.info(t('Notifications.discountApplied'));
      setShowModalDiscount(false);
    } else {
      notifier.error(t('Errors.APPLY_DISCOUNT'));
    }
  }, [discountCode])

  return (
    <Page title="Abonnements" separator breadcrumbs={[{ content: 'Accueil', url: '/' }]} secondaryActions={[
      { content: 'Code promotionnel', onAction: () => setShowModalDiscount(true), icon: GiftCardMinor }
    ]}>
      <TitleBar title="Abonnements" />

      <Modal
        title="Code promotionnel"
        open={showModalDiscount}
        onClose={() => setShowModalDiscount(false)}
        primaryAction={{
          content: 'Appliquer',
          onAction: applyDiscount
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              placeholder=""
              value={discountCode}
              onChange={value => setDiscountCode(value)}
              helpText="Saisissez un code promotionnel valide pour bénéficier d'une promotion."
            />
          </FormLayout>
        </Modal.Section>
      </Modal>

      <div style={{marginTop: 50}}>
        <Layout>
          <Layout.Section>
            <div style={{ display: 'flex', position: 'relative' }}>
              <div style={styles.features}>
                {(selectedPlan && selectedPlan.features) ? (
                  <Features features={selectedPlan.features} />
                ) : (
                  <div>
                    Sélectionnez un abonnement
                  </div>
                )}
              </div>
              <div style={styles.plans}>
                {plans.map(plan => (
                  <div key={plan.id}>
                    <PlanCard
                      plan={plan}
                      updatePlan={setSelectedPlan}
                      current={plan === plan.id}
                      selected={selectedPlan.id === plan.id} />
                  </div>
                ))}

                <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                  <Button disabled={plan.id === selectedPlan.id} primary onClick={confirmSubscription}>Choisir cet abonnement</Button>
                </div>
              </div>
            </div>
          </Layout.Section>

          <Layout.Section>
            <div style={{marginTop: 20}}>
              <Banner
                title="Vous bénéficiez de 14 jours d'essai"
                status="info"
              >
                <p>Pour que vous puissiez découvrir notre service et ses fonctionnalités, nous vous offrons 14 jours d'essai à l'installation, après ce délai vous devrez sélectionner un abonnement mensuel ci-dessus.</p>
              </Banner>
            </div>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
  )
}