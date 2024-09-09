//CountDown timer, get start time from props
//If time is up, callback func
import { useEffect, useState } from 'react'

export default function Timer(props: { startTime: number; callback: () => void }) {
  const [time, setTime] = useState(props.startTime)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time - 1)
    }, 1000)
    if (time <= 0) {
      props.callback()
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [props, time])
  return <span className={`${time < 10 ? 'text-red-500' : ''}`}>{time}</span>
}
