import Input from '@/components/Input'
import Navbar from '@/components/NavBar'
import Textarea from '@/components/Textarea'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'

export default function EditInput({ onClose, type, onCommit }) {
  const defaultValue = useSelector(state => state.profile.profile[type])
  const [value, setValue] = useState(defaultValue || '')

  return (
    <div className={styles.root}>
      <Navbar
        extra={
          <span className="commit-btn" onClick={() => onCommit(type, value)}>
            提交
          </span>
        }
        onLiftClick={onClose}
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </Navbar>

      <div className="content-box">
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>

        {/* 回显内容 */}
        {type === 'name' ? (
          <Input className="input-wrap" value={value} onChange={e => setValue(e.target.value)} autoFocus></Input>
        ) : (
          <Textarea value={value} onChange={e => setValue(e.target.value)} maxLength={100}></Textarea>
        )}
      </div>
    </div>
  )
}
