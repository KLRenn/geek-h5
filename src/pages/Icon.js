import React from 'react'
import classNames from 'classnames'

const Icon = (type, style, className) => {
  return (
    <div>
      <svg
        style={style}
        className={classNames('icon', className)}
        aria-hidden="true"
      >
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </div>
  )
}

export default Icon
