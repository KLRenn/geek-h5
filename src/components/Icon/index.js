import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Icon = (props) => {
  const { type, className, onClick } = { ...props }
  return (
    <div>
      <svg
        onClick={onClick}
        className={classNames('icon', className)}
        aria-hidden="true"
      >
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </div>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
}

export default Icon
