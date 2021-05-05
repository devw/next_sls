import React, { useContext, useEffect, useState } from 'react'
import AssetsS3 from '@utils/AssetsS3.utils'
import { UserContext } from '@contexts/User/User.context'
import styles from './Recommendations.module.css'

export default function Recommendations() {
  const { user } = useContext(UserContext)
  const [recommendations, setRecommendations] = useState(null)

  const fetchRecommendations = async () => {
    const _recommendations = await AssetsS3.getRecommendations()

    const shuffled = _recommendations.sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 2)
    
    setRecommendations(selected)
  }

  useEffect(() => {
    fetchRecommendations()
  }, [])

  if (!recommendations) {
    return null
  }

  return (
    <div className={styles.container}>
      {recommendations.map(r => (
        <div className={styles.block} key={r.title}>
          <div className={styles.block_left}>
            <img className={styles.block_logo} src={r.logo_url} />
          </div>
          <div className={styles.block_right}>
            <a className={styles.block_title} href={r.link + `?locale=${user.locale || 'en'}`} target="_blank">
              {r.title}
            </a>
            <p className={styles.block_desc}>
              {r.description}
            </p>

            {(r.rating) && (
              <div className={styles.footer}>
                <div className={styles.footer_icon}>
                  <svg fill="#BA8A02" viewBox="0 0 20 20" focusable="false" aria-hidden="true"><path d="M5.2 18a.8.8 0 0 1-.792-.914l.743-5.203-2.917-2.917a.8.8 0 0 1 .434-1.355l4.398-.733 2.218-4.435a.8.8 0 0 1 1.435.008l2.123 4.361 4.498.801a.8.8 0 0 1 .425 1.353l-2.917 2.917.744 5.203a.8.8 0 0 1-1.154.828l-4.382-2.22-4.502 2.223A.792.792 0 0 1 5.2 18z"></path></svg>
                </div>
                <div>{r.rating} ({r.review_count && r.review_count} reviews) • {r.pricing && r.pricing}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}