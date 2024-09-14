import { Fragment, useCallback } from 'react'
import { GCodeSetAbsolute, GCodeSetRelative, GCodeTravel } from '../rpc/GCode.ts'
import { sendRPC } from '../rpc'

export default function PickUpButton(props: { click: () => void }) {
  const click = useCallback(() => {
    sendRPC(GCodeSetAbsolute()).then(() => {
      sendRPC(GCodeTravel({ z: 1 }, 4000)).then(() => {
        sendRPC(GCodeSetRelative()).then(() => {
          props.click()
        })
      })
    })
  }, [props.click])
  const clickDown = useCallback(() => {
    sendRPC(GCodeSetAbsolute()).then(() => {
      sendRPC(GCodeTravel({ z: 200 }, 4000)).then(() => {
        sendRPC(GCodeSetRelative()).then(() => {
          props.click()
        })
      })
    })
  }, [props.click])
  return (
    <Fragment>
      <div className={`h-64 w-64 rounded-[100%] bg-red-400 drop-shadow-2xl active:bg-red-600`} onClick={click}></div>
      <div
        className={`h-64 w-64 rounded-[100%] bg-red-400 drop-shadow-2xl active:bg-red-600`}
        onClick={clickDown}
      ></div>
    </Fragment>
  )
}
