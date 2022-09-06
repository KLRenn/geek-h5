import React from 'react'

const Icon = (type) => {
  return (
    <div>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </div>
  )
}

export default Icon
