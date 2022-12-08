import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

export default function Textarea({ maxLength, className, onChange, ...rest }) {
  const [value, setValue] = useState(rest.value || '')
  const handelChange = e => {
    setValue(e.target.value)

    if (onChange) {
      onChange(e)
    }
  }

  const textRef = useRef(null)
  useEffect(() => {
    textRef.current.focus()
    textRef.current.setSelectionRange(-1, -1) // 修改光标的位置 
  }, [])

  return (
    <div className={styles.root}>
      {/* 文本输入框 */}
      <textarea
        ref={textRef}
        className={classNames('textarea', className)}
        maxLength={maxLength}
        {...rest}
        value={value}
        onChange={handelChange}
      />

      {/* 当前字数/最大允许字数 */}
      <div className="count">
        {value.length}/{maxLength}
      </div>
    </div>
  )
}
