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
          await sendRPC(GCodeTravel({ y: 20 }, speed))
          break
        case 'RIGHT':
          await sendRPC(GCodeTravel({ x: 20 }, speed))
          break
        case 'LEFT':
          await sendRPC(GCodeTravel({ x: -20 }, speed))
          break
        case 'BACKWARD':
          await sendRPC(GCodeTravel({ y: -20 }, speed))
          break
        default:
          break
      }
    }, 200)
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

export interface RPCRequest {
  method: string
  params?: { [key: string]: any }
  id: number
  jsonrpc: string
}

export interface RPCResponse {
  result: { [key: string]: any } | null
  error: { [key: string]: any } | null
  id: number
  jsonrpc: string
}

async function sendRPC(req: RPCRequest): Promise<RPCResponse | null> {
  try {
    const data = await fetch(`http://localhost:7125/server/jsonrpc`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await data.json()
    if (json) {
      console.log(json)
      return json as RPCResponse
    }
  } catch (e) {
    console.log(e)
  }
  return null
}
