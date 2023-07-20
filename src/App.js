import './App.css'
import PuzzleBoard from './components/PuzzleBoard/PuzzleBoard'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [movesPGN, setMovesPGN] = useState("")
  const [positionFEN, setPositionFEN] = useState("")
  const [puzzleID, setPuzzleID] = useState(12);
  //Read in the current puzzle from the backend. 
  const apiURL = "http://localhost:8080/"
  useEffect(() => {
    axios.get(`${apiURL}${puzzleID}`).then(response => {
      console.log(response.data);
      setMovesPGN(response.data.Moves);
      setPositionFEN(response.data.FEN);
    }).catch(response => {
      console.error(response);
    })
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
      <button onClick = {() => {setPuzzleID((puzzleID+1))}}>Next Puzzle</button>
    </>
  )
}

export default App
