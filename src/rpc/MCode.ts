import { RPCRequest } from '../component/ControlJoystick.tsx'

export function MCodeSetAccel(accel: number): RPCRequest {
  return {
    method: 'printer.gcode.script',
    params: {
      script: `M204 T${accel}`,
    },
    id: 7466,
    jsonrpc: '2.0',
  }
}
