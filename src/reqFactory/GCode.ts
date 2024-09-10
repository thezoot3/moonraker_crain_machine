import { RPCRequest } from '../component/ControlJoystick.tsx'

export interface ThreeAxis {
  x?: number
  y?: number
  z?: number
}

export function GCodeTravel(axis: ThreeAxis, speed: number): RPCRequest {
  // RPC Request
  return {
    method: 'server.gcode.script',
    params: {
      script: `G0 F${speed} ${axis.x ? `X${axis.x}` : ''} ${axis.y ? `Y${axis.y}` : ''} ${axis.z ? `Z${axis.z}` : ''}`,
    },
    id: 7466,
    jsonrpc: '2.0',
  }
}

export function GCodeSetRelative(): RPCRequest {
  return {
    method: 'server.gcode.script',
    params: {
      script: 'G91',
    },
    id: 7466,
    jsonrpc: '2.0',
  }
}

export function GCodeSetAbsolute(): RPCRequest {
  return {
    method: 'server.gcode.script',
    params: {
      script: 'G90',
    },
    id: 7466,
    jsonrpc: '2.0',
  }
}
