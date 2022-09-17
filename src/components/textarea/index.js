import classnames from 'classnames'
import { useState } from 'react'
import styles from './index.module.scss'
import { TextArea } from 'antd-mobile'

const Textarea = (value, placeholder, onValueChange) => {
  return (
    <div className={styles.root}>
      <TextArea
        placeholder={placeholder}
        value={value}
        onChange={onValueChange}
        showCount
        maxLength={200}
      ></TextArea>
    </div>
  )
}

export default Textarea
