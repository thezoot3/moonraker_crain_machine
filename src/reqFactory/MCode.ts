export function MCodeSetAccel(accel: number) {
  return `/printer/gcode/script?script=M204 T${accel}`
}
