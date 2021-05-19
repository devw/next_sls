import { useContext } from 'react'
import { ConfigurationContext } from '@contexts/Configuration/Configuration.context'
import { FormLayout, Checkbox } from '@shopify/polaris'
import styles from './EmailNotifications.module.css'
import classNames from 'classnames'

function NotificationChoice({ id, label, description, disabled }) {
  const { data, update } = useContext(ConfigurationContext)
  const checked = data?.email_alerts?.notifications?.[id]
  
  const toggleCheckbox = () => {
    if (!disabled) {
      update(`email_alerts.notifications.${id}`, !checked)
    }
  }

  return (
    <div
      className={classNames(styles.choice, {
        [styles.choice__selected]: checked
      })}
      onClick={toggleCheckbox}
    >
      <Checkbox
        label={label}
        helpText={description}
        disabled={disabled}
        checked={checked}
        onChange={toggleCheckbox}
      />
    </div>
  )
}

export default function EmailNotifications() {

  return (
    <FormLayout>
      <NotificationChoice
        id="erasure_confirmation"
        label="Erasure confirmation"
        description="[Obligatory notification] The admin will be notified when the user confirms the desire to erase/delete personal data."
        disabled={true}
      />

      <NotificationChoice
        id="erasure"
        label="Erasure"
        description="[Optional] The admin will be notified when the the user submits a deletion request."
      />

      <NotificationChoice
        id="portability"
        label="Portability"
        description="[Optional] The admin will be notified when the the user submits a portability request in order to download personal data."
      />

      <NotificationChoice
        id="access"
        label="Access"
        description="[Optional] The admin will be notified when the the user submits an access request in order to view personal data stored on the shop."
      />

      <NotificationChoice
        id="rectification"
        label="Rectification"
        description="[Optional] The admin will be notified when the the user submits a rectification request in order to update personal data stored on the shop."
      />
    </FormLayout>
  )
}
