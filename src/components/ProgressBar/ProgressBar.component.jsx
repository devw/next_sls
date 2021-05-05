import styles from './ProgressBar.module.css'
import classNames from 'classnames'

const ProgressBar = ({ progress = 50, title, subtitle, warning, alert }) => (
  <div className={styles.progressBar}>
    <div className={styles.progressBar_title}>{title}</div>

    <div className={styles.progressBar_container}>
      <div
        className={classNames(styles.progressBar_progress, {
          [styles.progressBar_progress__warning]: warning,
          [styles.progressBar_progress__alert]: alert
        })}
        style={{width: `${progress > 100 ? 100 : progress}%`}}
      />
    </div>

    <div className={styles.progressBar_subtitle}>{subtitle}</div>
  </div>
)

export default ProgressBar