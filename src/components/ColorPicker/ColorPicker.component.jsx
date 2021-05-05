import { useEffect, useRef, useState, useCallback } from 'react'
import useOnClickOutside from '@hooks/useOnClickOutside.hook'
import { Button } from '@shopify/polaris'
import { ChromePicker } from 'react-color'
import { rgbObject, rgbString } from './ColorPicker.utils'
import styles from './ColorPicker.module.css'
import classNames from 'classnames'

export default function ColorPicker({ label, value, onChange }) {
  const ref = useRef()
  const [color, setColor] = useState(rgbObject(value))
  const [open, setOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  useOnClickOutside(ref, () => {
    setOpen(false)
  })

  useEffect(() => {
    onChange(rgbString(color))
  }, [color])

  return (
    <div className={styles.container}>
      <div
        ref={ref} 
        className={classNames(styles.picker, {
          [styles.picker__opened]: open
        })}
      >
        <ChromePicker
          color={color}
          onChange={c => setColor(c.rgb)}
        />
      </div>

      <Button fullWidth onClick={toggleOpen}>
        <div className={styles.cta}>
          <span className={styles.cta_label}>{label}</span>
          <div className={styles.cta_square} style={{background: rgbString(color)}} />
        </div>
      </Button>
    </div>
  )
}