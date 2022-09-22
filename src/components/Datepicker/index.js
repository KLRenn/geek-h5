import React, { useState } from 'react'
import { DatePicker, Toast } from 'antd-mobile'

const Datepicker = ({ birthday, onCommit, visible, onClose }) => {
  const [state, setState] = useState(birthday)

  const date1 = new Date(state || birthday)
  return (
    <div>
      <DatePicker
        min={new Date(1900, 1, 1, 0, 0, 0)}
        max={new Date()}
        /* defaultValue={new Date()} */
        touch-action="none"
        mouseWheel="true"
        visible={visible}
        onClose={onClose}
        precision="day"
        value={date1}
        onConfirm={(val) => {
          setState(val)
          onCommit(val)
        }}
      ></DatePicker>
    </div>
  )
}

export default Datepicker
