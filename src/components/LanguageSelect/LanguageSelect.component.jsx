import React, { useCallback, useState, useRef } from 'react';
import { Icon } from "@shopify/polaris";
import { GlobeMajor } from "@shopify/polaris-icons";
import useOnClickOutside from '@hooks/useOnClickOutside.hook';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/dist/client/router';
import styles from './LanguageSelect.module.css'
import classNames from 'classnames'

export default function LanguageSelect({ lang }) {
  const ref = useRef()
  const router = useRouter()
  const { t } = useTranslation()

  const [open, setOpen] = useState(false);

  useOnClickOutside(ref, () => setOpen(false));

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open])

  const switchLocale = useCallback((locale) => {
    router.push(`/${locale}`)
  }, [lang]);

  return (
    <div
      ref={ref}
      onClick={() => toggleOpen()}
      className={styles.container}
    >
      <div className={styles.languageSelect}>
        <div className={styles.cta}>
          <div className={styles.cta_logo}>
            <Icon source={GlobeMajor} />
          </div>
          <div>
            {t(`locale_${router.locale}`)}
          </div>
        </div>

        {open && (
          <div className={styles.popup}>
            {router.locales.map(locale => (
              <div
                key={`locale-${locale}`}
                onClick={() => switchLocale(locale)}
                className={classNames(styles.localeRow, {
                  [styles.localeRow__selected]: router.locale === locale
                })}
              >
                <span className={styles.countryCode}>{locale}</span>
                {t(`locale_${locale}`)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}