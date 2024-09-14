import { useEffect, useRef, useState } from 'react'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'
import { GCodeSetRelative, GCodeTravel } from '../rpc/GCode.ts'
import { Joystick } from 'react-joystick-component'
import { MCodeSetAccel } from '../rpc/MCode.ts'
import { sendRPC } from '../rpc'

const speed = 5000
const accel = 2000

export default function ControlJoystick() {
  const [direction, setDir] = useState<'FORWARD' | 'RIGHT' | 'LEFT' | 'BACKWARD' | null>()
  const timerRef = useRef<number>()
  const moveEvent = (event: IJoystickUpdateEvent) => {
    setDir(event.direction)
  }
  const stopEvent = () => {
    setDir(null)
  }
  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(async () => {
      switch (direction) {
        case 'FORWARD':
          await sendRPC(GCodeTravel({ y: 30 }, speed))
          break
        case 'RIGHT':
          await sendRPC(GCodeTravel({ x: 30 }, speed))
          break
        case 'LEFT':
          await sendRPC(GCodeTravel({ x: -30 }, speed))
          break
        case 'BACKWARD':
          await sendRPC(GCodeTravel({ y: -30 }, speed))
          break
        default:
          break
      }
    }, 100)
  }, [direction])
  useEffect(() => {
    async function init() {
      await sendRPC(GCodeSetRelative())
      await sendRPC(MCodeSetAccel(accel))
    }
    init().then()
  }, [])
  return (
    <Joystick
      move={moveEvent}
      stop={stopEvent}
      baseImage={'https://www.cssscript.com/demo/touch-joystick-controller/images/joystick-base.png'}
      size={256}
    />
  )
}
