import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard"
import "../pages/PuzzlePage.scss"
import axios from "axios";
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"
import { useSearchParams } from "react-router-dom";

function PuzzlePage({ category, categoryRange }) {
    const [movesObjectNotation, setMovesObjectNotation] = useState("")
    const [positionFEN, setPositionFEN] = useState("")
    const [isHint, setIsHint] = useState(false)
    const [title, setTitle] = useState("")
    const puzzleID = useParams().id
    const navigate = useNavigate();
    //Settings are passed through URL queries
    const [settings,] = useSearchParams()
    useEffect(() => {
        const apiURL = !!settings.get("difficulty") ? `http://localhost:8080${category}/difficulty/${settings.get('difficulty')}` : `http://localhost:8080${category}/${puzzleID}`
        axios.get(apiURL).then(response => {
            setMovesObjectNotation(response.data.Moves);
            setPositionFEN(response.data.FEN);
            let possibleTitles = response.data.Themes.split(" ")
            setTitle(possibleTitles[Math.floor(Math.random() * possibleTitles.length)])
        }).catch(response => {
            console.error(response);
        })
    }, [category, puzzleID, settings])
    if (!positionFEN || !movesObjectNotation) {
        return <>
            Loading...
        </>
    }
    //Helper method. Converts camelCase to Title Case. 
    const titleCase = (camel) => {
        let title = ""
        title += camel[0].toUpperCase()
        for (let i = 1; i < camel.length - 1; i++) {
            title += camel[i]
            if (camel[i + 1].toUpperCase() === camel[i + 1]) {
                title += " "
            }
        }
        title += camel[camel.length - 1]
        return title
    }

    
    return (
        <>
            <div className="board-container">
                <PuzzleBoard positionFEN={positionFEN} movesArray={movesObjectNotation.split(' ')} orientation={positionFEN.indexOf('b') > positionFEN.indexOf('w') ? "white" : "black"} showHint={isHint} setShowHint={setIsHint} />
            </div>
            <div className="navpanel">
                <button className="navbutton navbutton--backward"></button>
                <button className={`navbutton navbutton--${isHint ? 'hintactive' : 'hint'}`} onClick={() => setIsHint(!isHint)}></button>
                {settings.get("title") !== 'off' && <p className="navpanel__title">{titleCase(title)}</p>}

                <button className="navbutton navbutton--forward" onClick={() => { 
                    setInterval(navigate(`${category}/${Math.ceil(Math.random() * categoryRange)}?${settings.toString()}`), 500) }}></button>
            </div>
        </>
    )
}


export default PuzzlePage