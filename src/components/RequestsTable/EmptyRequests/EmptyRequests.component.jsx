import { EmptyState } from '@shopify/polaris'
import styles from './EmptyRequests.module.css'

export default function EmptyRequests() {
  const { t } = useTranslation('common')
  const heading = t('RegulationRequests.emptyState.title')
  const description = t('RegulationRequests.emptyState.description')

  return (
    <div className={styles.container}>
      <div className={styles.container_left}>
        <img src={`${cdn}/images/undraw_no-data.svg`} />
      </div>
      
      <div className={styles.container_right}>
        <EmptyState
          heading={heading}
          imageContained
          image=""
        >
          <p>{description}</p>
        </EmptyState>
      </div>
    </div>
  )
}