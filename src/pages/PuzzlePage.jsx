import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard"
import "../pages/PuzzlePage.scss"
import axios from "axios";
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"

function PuzzlePage({ category, categoryRange }) {
    const [movesObjectNotation, setMovesObjectNotation] = useState("")
    const [positionFEN, setPositionFEN] = useState("")
    const [isHint, setIsHint] = useState(false)
    const puzzleID = useParams().id
    const navigate = useNavigate();
    const apiURL = `http://localhost:8080${category}/${puzzleID}`
    useEffect(() => {
        axios.get(apiURL).then(response => {
            setMovesObjectNotation(response.data.Moves);
            setPositionFEN(response.data.FEN);
        }).catch(response => {
            console.error(response);
        })
    }, [apiURL])
    if (!positionFEN || !movesObjectNotation) {
        return <>
            Loading...
        </>
    }
    return (
        <>
            <div className="board-container">
                <PuzzleBoard positionFEN={positionFEN} movesArray={movesObjectNotation.split(' ')} orientation={positionFEN.indexOf('b') > positionFEN.indexOf('w') ? "white" : "black"} showHint={isHint} setShowHint={setIsHint} />
            </div>
            <div className="navpanel">
                <button className="navbutton navbutton--backward"></button>
                <button className={`navbutton navbutton--${isHint ? 'hintactive':'hint'}`} onClick={() => setIsHint(!isHint)}></button>
                <button className="navbutton navbutton--forward" onClick={() => { navigate(`${category}/${Math.ceil(Math.random() * categoryRange)}`) }}></button>
            </div>
        </>
    )
}


export default PuzzlePage