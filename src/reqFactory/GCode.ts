export interface ThreeAxis {
  x?: number
  y?: number
  z?: number
}

export function GCodeTravel(axis: ThreeAxis, speed: number) {
  return `/printer/gcode/script?script=G0 F${speed} ${axis.x ? `X${axis.x}` : ''} ${axis.y ? `Y${axis.y}` : ''} ${axis.z ? `Z${axis.z}` : ''}`
}

export function GCodeSetRelative() {
  return `/printer/gcode/script?script=G91`
}

export function GCodeSetAbsolute() {
  return `/printer/gcode/script?script=G90`
}
