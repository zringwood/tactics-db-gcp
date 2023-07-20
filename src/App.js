import './App.css'
import PuzzleBoard from './components/PuzzleBoard/PuzzleBoard'
import { useEffect, useState } from 'react'

const testingData = [{
  "FEN":"8/8/8/8/1Q6/1K6/8/2Nk4 w - - 0 1"
  ,"moves":"1. Qa5 Kxc1 2. Qe1# 1-0"},
  {"FEN":"8/8/5R2/8/2P1k3/2K5/5P2/2B5 w - - 0 1"
  ,"moves":"1. Bb2 Ke5 2. Kd3# 1-0"},
  {"FEN":"2b4Q/4p2K/4pr2/2P1k3/2P2R2/3P3p/2n4B/8 w - - 0 1"
  ,"moves":"1. Kg7 Nd4 1-0"}]

function App() {
  const [movesPGN, setMovesPGN] = useState("")
  const [positionFEN, setPositionFEN] = useState("")
  const [puzzleID, setPuzzleID] = useState(0);
  useEffect(() => {
    setMovesPGN(testingData[puzzleID].moves)
    setPositionFEN(testingData[puzzleID].FEN)
  },[puzzleID])
  if(!positionFEN || !movesPGN){
    return <>
    Loading...
    </>
  }
  return (
    <>
      <div style={{ width: 500 + "px" }}>
        <PuzzleBoard positionFEN={positionFEN} movestrPGN={movesPGN} puzzleID={puzzleID}/>
      </div>
      <button onClick = {() => {setPuzzleID((puzzleID+1)%testingData.length)}}>Next Puzzle</button>
    </>
  )
}

export default App
