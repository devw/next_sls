import { useEffect, useContext, useState } from 'react';
import Slider from 'react-slick';
import AssetsS3 from '@utils/AssetsS3.utils';
// import { getCookie } from '@utils/Global.utils'
import { slickSettings } from './AnnouncementBar.utils'
import styles from './AnnouncementBar.module.css'
import { UserContext } from '../../contexts/User/User.context';

export default function AnnouncementBar() {
  const { plan } = useContext(UserContext)
  const lang = 'en' // getCookie('KastorLocale')

  const [announcements, setAnnouncements] = useState([])

  const fetchGlobal = async () => {
    const _announcements = await AssetsS3.getGlobalAnnouncements()
    return _announcements || [];
  }

  const fetchLocal = async () => {
    const _announcements = await AssetsS3.getLocalAnnouncements()
    return _announcements || [];
  }

  const initializeAnnouncements = async () => {
    const globalAnnouncements = await fetchGlobal();
    const localAnnouncements = await fetchLocal();

    let anns = [
      ...globalAnnouncements,
      ...localAnnouncements
    ]

    anns.forEach((ann, index) => {
      if (anns[index][lang])
        anns[index] = anns[index][lang];
      if (ann.plans && !ann.plans.includes(plan.id))
        anns.splice(index, 1);
      if (ann.begin && Date.now() < parseInt(ann.begin))
        anns.splice(index, 1);
      if (ann.end && Date.now() > parseInt(ann.end))
        anns.splice(index, 1);
    })

    setAnnouncements(anns)
  };

  useEffect(() => {
    initializeAnnouncements()
  }, []);

  return (
    (announcements && announcements.length) && (
      <div className={styles.announcebar}>
        <Slider {...slickSettings}>
          {announcements.map((announcement, index) => (
            <p className={styles.announcebar_text} key={`announcement-${index}`}>
              {announcement.content}{" "}
              {announcement.link && (
                <a href={announcement.link.url} target="_blank" className={styles.announcebar_link}>
                  {announcement.link.label}
                </a>
              )}
            </p>
          ))}
        </Slider>
      </div>
    )
  )
}