import { useState, useCallback } from 'react'
import { Icon, Collapsible } from '@shopify/polaris'
import { PlusMinor, MinusMinor } from '@shopify/polaris-icons'
import styles from './AccordionFAQ.module.css'
import classNames from 'classnames'


export default function AccordionFAQ({ title, children }) {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), [])

  return (
    <div className={styles.accordion}>
      <div onClick={handleToggle} className={classNames(styles.accordion_head, {
        [styles.accordion_head__active]: open
      })}>
        {title}

        <div>
          <Icon
            source={open ? MinusMinor : PlusMinor}
            color="inkLight"
          />
        </div>
      </div>

      <Collapsible
        open={open}
        id="basic-collapsible"
        transition={{duration: '200ms', timingFunction: 'ease-in-out'}}
        expandOnPrint
      >
        <div className={styles.accordion_content}>
          {children}
        </div>
      </Collapsible>
    </div>
  )
}