import { Input } from 'antd-mobile'
import { useState } from 'react'
import React from 'react'
/* import classnames from 'classnames' */
import styles from './index.module.scss'

const Input1 = ({
  placeholder,
  value,
  onChange,
  className,
  onBlur,
  autoComplete,
  maxLength,
  extra,
  onExtraClick,
  onKeyDown,
  ...rest
}) => {
  return (
    <div className={styles.root}>
      <Input
        type="text"
        onlyShowClearWhenFocus="true"
        clearable
        maxLength={maxLength}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...rest}
      ></Input>
      {extra && (
        <span className="extra" onClick={onExtraClick}>
          {extra}
        </span>
      )}
    </div>
  )
}

export default Input1
