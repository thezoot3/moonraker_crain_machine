import ControlJoystick from './component/ControlJoystick.tsx'
import Timer from './component/Timer.tsx'

function App() {
  return (
    <div className={'flex h-full w-full justify-center'}>
      <div className={'flex h-full flex-col items-center justify-center gap-10'}>
        <span className={'text-4xl font-semibold'}></span>
        <div className={'flex h-full items-center justify-center gap-24'}>
          <ControlJoystick />
          <div className={'h-64 w-64 rounded-[100%] bg-red-400 drop-shadow-2xl'}></div>
        </div>
        <span className={'text-6xl font-semibold'}>
          <Timer startTime={30} callback={() => {}} />
        </span>
      </div>
    </div>
  )
}

export default App
