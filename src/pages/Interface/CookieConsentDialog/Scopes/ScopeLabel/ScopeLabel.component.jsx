import styles from './ScopeLabel.module.css'

export default function ScopeLabel({ label, info }) {

  return (
    <div className={styles.scope}>
      <div>{label}</div>
      {info && (
        <div style={styles.scope_info}>
          <Tooltip content={info}>
            <Icon source={InfoMinor} color="skyLighter" />
          </Tooltip>
        </div>
      )}
    </div>
  )
}