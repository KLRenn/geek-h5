import React, { useState } from 'react'
import NavBar from '@components/NavBar'
import styles from './index.module.scss'
/* import Input1 from '@../components/Input' */
import { Input, TextArea } from 'antd-mobile'
/* import Textarea from '@../components/textarea' */

const EditInput = ({ onClose, userConfig, onCommit }) => {
  const [value, setValue] = useState(userConfig.value || '')
  const onValueChange = (e) => {
    setValue(e)
  }
  return (
    <div className={styles.root}>
      <NavBar
        onLeftClick={onClose}
        type={userConfig.type}
        extra={
          <span
            className="commit-btn"
            onClick={() => onCommit(userConfig.type, value)}
          >
            提交
          </span>
        }
      ></NavBar>
      {userConfig.type === 'name' ? (
        <Input
          onlyShowClearWhenFocus="true"
          clearable
          onClear={() => setValue('')}
          /* placeholder={val.val ? val.val : val.val} */
          placeholder={`'请输入${userConfig.type}'`}
          /* value={value1 ? value1 : val.val} */
          value={value}
          /* onChange={(value) => {
            setValue1(value1)
          }} */
          onChange={onValueChange}
        ></Input>
      ) : (
        <div>
          <TextArea
            placeholder={`'请输入${userConfig.type}'`}
            value={value}
            onChange={onValueChange}
            showCount
            maxLength={200}
          ></TextArea>
        </div>
      )}
    </div>
  )
}

export default EditInput
