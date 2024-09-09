import { useEffect, useRef, useState } from 'react'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'
import { GCodeSetRelative, GCodeTravel } from '../reqFactory/GCode.ts'
import { Joystick } from 'react-joystick-component'
import { MCodeSetAccel } from '../reqFactory/MCode.ts'

const speed = 100
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
          await sendMoonrakerGcode(GCodeTravel({ y: 20 }, speed))
          break
        case 'RIGHT':
          await sendMoonrakerGcode(GCodeTravel({ x: 20 }, speed))
          break
        case 'LEFT':
          await sendMoonrakerGcode(GCodeTravel({ x: -20 }, speed))
          break
        case 'BACKWARD':
          await sendMoonrakerGcode(GCodeTravel({ y: -20 }, speed))
          break
        default:
          break
      }
    }, 200)
  }, [direction])
  useEffect(() => {
    async function init() {
      await sendMoonrakerGcode(GCodeSetRelative())
      await sendMoonrakerGcode(MCodeSetAccel(accel))
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

async function sendMoonrakerGcode(path: string) {
  try {
    const data = await fetch(`http://localhost:7125${path}`, {
      method: 'POST',
    })
    const json = await data.json()
    if (json) {
      console.log(json)
      return json
    }
  } catch (e) {
    console.error(e)
  }
}
