import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard"
import "../pages/PuzzlePage.scss"
import axios from "axios";
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from "react-router"
import { useSearchParams } from "react-router-dom";
import GlobalSpinner from "../components/GlobalSpinner/GlobalSpinner";
import { Chessboard } from "react-chessboard";

function PuzzlePage({ category, ranges }) {
    const [movesObjectNotation, setMovesObjectNotation] = useState("")
    const [positionFEN, setPositionFEN] = useState("")
    const [isHint, setIsHint] = useState(false)
    const [title, setTitle] = useState("")
    const [isPuzzleOver, setIsPuzzleOver] = useState(false)
    const puzzleID = useParams().id
    const difficulty = useParams().difficulty
    const navigate = useNavigate();

    //Settings are passed through URL queries
    const [settings,] = useSearchParams()
    //We pull this in so that we can hide the move animations when navigating between pages. 
    const location = useLocation()
    const [transition, setTransition] = useState("")
    useEffect(() => {
        setTransition("win")
        setTimeout(() => {
            setTransition("")
        }, 500)
    }, [location])

    const [visited, setVisited] = useState(!!localStorage.getItem("visited") ? localStorage.getItem("visited").split(',') : [])
    useEffect(() => {
        //Store a maximum of 50 puzzles in localStorage. Little arbitrary but it has to be some number or we'll get errors when localStorage maxes out. 
        if (visited.length > 0)
            localStorage.setItem("visited", visited.slice(0, 50))
    }, [visited])
    let apiURL = `http://localhost:8080/${category}/${difficulty}/${puzzleID}`
    useEffect(() => {
        axios.get(`${apiURL}`).then(response => {
            setMovesObjectNotation(response.data.Moves);
            setPositionFEN(response.data.FEN);
            let possibleTitles = response.data.Themes.split(" ")
            setTitle(possibleTitles[Math.floor(Math.random() * possibleTitles.length)])
        }).catch(response => {
            console.error(response);
        })
    }, [apiURL])
    useEffect(() => {
        if(isPuzzleOver && settings.get('autoserve') === 'on'){
            setTimeout(() => 
            navigate(`/${category}/${difficulty}/${Math.ceil(Math.random() * ranges[`${category}_${difficulty}`])}${location.search}`)
            , 500)
            setIsPuzzleOver(false)
        }
    }, [isPuzzleOver, settings, navigate, category, difficulty, ranges, location.search])
    if (!positionFEN || !movesObjectNotation) {
        return <GlobalSpinner />
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
            <div className={`board-container`}>
                {<Chessboard position={"8/8/8/8/8/8/8/8 w - - - -"} customBoardStyle={
                    {
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 ',
                        borderRadius: "24px",
                    }
                    
                } 
                showBoardNotation={false}
                />}
            </div>
            <div className="board-container page-positioning"> 
                {!transition && <PuzzleBoard positionFEN={positionFEN} movesArray={movesObjectNotation.split(' ')} orientation={positionFEN.indexOf('b') > positionFEN.indexOf('w') ? "white" : "black"} showHint={isHint} setShowHint={setIsHint} setTitle={setTitle} title={title}/>}
            </div>
            <div className="navpanel page-positioning">

                <button className={`navbutton navbutton--backward ${visited.length === 0 && "navbutton--hide"}`} onClick={() => {
                    if (visited.length > 0)
                        navigate(`${visited.shift()}${location.search}`)
                }}></button>

                <button className={`navbutton navbutton--${isHint ? 'hintactive' : 'hint'}`} onClick={() => setIsHint(!isHint)}></button>
                {settings.get("hidetitles") !== 'on' && <p className="navpanel__title">{titleCase(title)}</p>}
                {!transition ?
                    <button className="navbutton navbutton--forward" onClick={() => {
                        if (location.pathname.includes('introduction')) {
                            if (puzzleID === 1)
                                navigate(`/introduction/easy/2${location.search}`)
                            else
                                navigate(`/middlegames/easy/1${location.search}`)
                        } else {
                            navigate(`/${category}/${difficulty}/${Math.ceil(Math.random() * ranges[`${category}_${difficulty}`])}${location.search}`)

                        }
                        setVisited([location.pathname, ...visited])
                    }}></button>
                    :
                    <div style={{ marginLeft: "auto", width: "36px", height: "36px" }}>
                        <GlobalSpinner />
                    </div>}

            </div>
        </>
    )
}


export default PuzzlePage