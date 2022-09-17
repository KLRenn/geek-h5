import { ActionSheet, Toast } from 'antd-mobile'

import React, { useRef } from 'react'

const Actionsheet = ({ actions, visible, onClose, type, onCommit }) => {
  const fileRef = useRef
  return (
    <div>
      <ActionSheet
        extra={`请选择${type === 'avatar' ? '头像' : '性别'}`}
        closeOnAction="true"
        visible={visible}
        actions={actions}
        onClose={onClose}
        onAction={(action) => {
          /* if (action.key === '0') {
          onCommit('gender', 0)
          onClose()
        }else if (action.key === '1') {

        } else {

        } */
          switch (action.key) {
            case 'photo':
              Toast.show(`点击了${action.text}`)

              console.log(fileRef, fileRef.current)
              break

            case 'fromlocal':
              Toast.show(`点击了${action.text}`)
              console.log(fileRef, fileRef.current)
              break

            case 'cancel':
              Toast.show(`点击了${action.text}`)

              onClose()
              break

            case '0':
              Toast.show(`点击了${action.text}`)

              onCommit('gender', 0)
              break

            case '1':
              Toast.show(`点击了${action.text}`)

              onCommit('gender', 1)
              break
          }
        }}
      />
    </div>
  )
}

export default Actionsheet
