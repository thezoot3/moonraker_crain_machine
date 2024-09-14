import ControlJoystick from './component/ControlJoystick.tsx'
import Timer from './component/Timer.tsx'
import PickUpButton from './component/PickUpButton.tsx'

function App() {
  return (
    <div className={'flex h-full w-full justify-center'}>
      <div className={'flex h-full flex-col items-center justify-center gap-10'}>
        <span className={'text-4xl font-semibold'}></span>
        <div className={'flex h-full items-center justify-center gap-24'}>
          <ControlJoystick />
          <PickUpButton />
        </div>
        <span className={'text-6xl font-semibold'}>
          <Timer startTime={30} callback={() => {}} />
        </span>
      </div>
    </div>
  )
}

export default App
