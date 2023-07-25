import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard"
import "../pages/PuzzlePage.scss"
import axios from "axios";
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"

function PuzzlePage({ category, categoryRange }) {
    const [movesObjectNotation, setMovesObjectNotation] = useState("")
    const [positionFEN, setPositionFEN] = useState("")
    const puzzleID = useParams().id
    const navigate = useNavigate();
    const apiURL = `https://tactics-db-api-gcp-wqrtz47qla-uc.a.run.app${category}/${puzzleID}`
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
                <PuzzleBoard positionFEN={positionFEN} movesArray={movesObjectNotation.split(' ')} orientation={positionFEN.indexOf('b') > positionFEN.indexOf('w') ? "white" : "black"} />
            </div>
            <div className="navpanel">
                <button className="navbutton navbutton--backward"></button>
                <button className="navbutton navbutton--forward" onClick={() => { navigate(`${category}/${Math.ceil(Math.random() * categoryRange)}`) }}></button>
            </div>
        </>
    )
}


export default PuzzlePage