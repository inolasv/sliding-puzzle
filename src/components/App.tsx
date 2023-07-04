import { Canvas } from './Canvas'
import Instructions from './HowTo'




const App = () => {
  return (
    <div className="m-0 flex h-screen w-screen flex-col items-center justify-center bg-[#F1E7E4]">
      <div className="flex flex-col items-center justify-center">
        <div className='py-12 font-display text-5xl text-[#B08E8B]'>
          Escape Sliding Puzzle
        </div>
        <div className="flex flex-row">
          <Canvas width={400} height={500} />
          <div className="flex flex-col items-center pl-32">
            <div className="py-10">
              <button className="bg-[#B08E8B] p-3 font-display text-white" onClick={() => window.location.reload()}>Reset Puzzle</button>
            </div>
            <div>
              <Instructions />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default App
