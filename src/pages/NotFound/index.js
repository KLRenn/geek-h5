import { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const NotFound = () => {
  const [Second, setSecond] = useState(3)
  const timerRef = useRef(-1)
  const history = useHistory()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (Second <= 1) {
        return history.push('/home')
      }
      setSecond(Second - 1)
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [Second, history])

  return (
    <div>
      <h1>对不起，你访问的内容不存在...</h1>
      <p>
        {Second} 秒后，返回<Link to="/home">首页</Link>
      </p>
    </div>
  )
}

export default NotFound
