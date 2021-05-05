import classNames from 'classnames'
import styles from './AlfredLayout.module.css'
import AnnouncementBar from '@components/AnnouncementBar/AnnouncementBar.component'
import LanguageSelect from '@components/LanguageSelect/LanguageSelect.component'

export default function AlfredLayout({ children, withAnnouncement = true, withLanguageSelect = true }) {

  return (
    <div id="layout">
      {withAnnouncement && <AnnouncementBar />}

      <div className={classNames(styles.layout_page, {
        [styles.layout_page__withAnnouncementBar]: withAnnouncement
      })}>
        {children}
      </div>

      {withLanguageSelect && <LanguageSelect />}
    </div>
  )
}