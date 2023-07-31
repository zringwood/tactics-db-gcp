import { useState, useEffect, useRef } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import "../PuzzleBoard/PuzzleBoard.scss"

function PuzzleBoard({ positionFEN, movesArray, orientation, showHint, setShowHint, setTitle, title, setIsPuzzleOver }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))
    const moveIndex = useRef(0)
    //Used for click functionality
    const [selectedSquare, setSelectedSquare] = useState(undefined)
    //Used for highlighting squares
    const [highlightSquares, setHighlightSquares] = useState({})
    //The initial change of position shouldn't be animated. After that it should be. 
    const animationLength = useRef(0)
    const [highlightHint, setHightlightHint] = useState({})
    
    //The state variables don't actually change on reload without this.  
    useEffect(() => {
        animationLength.current = 0
        setMoveLogic(new Chess(positionFEN))
        //moveIndex must be reset when the puzzle resets.
         moveIndex.current = 0;
         setShowHint(false)
    }, [positionFEN, setShowHint])

    useEffect(() => {
        let hintHightlight = {}
        if (showHint && moveIndex.current < movesArray.length)
            hintHightlight[movesArray[moveIndex.current].slice(0, 2)] = { background: "rgba(255, 255, 0, 0.4)" }
        setHightlightHint(hintHightlight)
    }, [showHint, movesArray])
    
    const onClick = (square) => {
        if (!selectedSquare) {
            setSelectedSquare(square)
            const newSquares = {}
            newSquares[square] = { background: "rgba(255, 0, 0, 0.4)" }
            setHighlightSquares(newSquares)
        } else if (movesArray[moveIndex.current] === `${selectedSquare}${square}`) {
            updatePuzzle(`${selectedSquare}${square}`)
            if (!isEndofPuzzle()) {
                const halfSecond = 500
                setTimeout(() => {
                    updatePuzzle(movesArray[moveIndex.current])
                }, halfSecond)
            }else{
                setIsPuzzleOver(true)
            }
            setSelectedSquare(undefined)
            setHighlightSquares({})
        }
        else {
            if(square !== selectedSquare){
                setTitle("Try Again")
                setTimeout(() => {
                    setTitle(title)
                }, 1000)

            }
            setSelectedSquare(undefined)
            setHighlightSquares({})
        }


    }
    const onDrop = (sourceSquare, targetSquare) => {
        let move = `${sourceSquare}${targetSquare}`
        if (isCorrectMove(move)) {
            updatePuzzle(move)
            if (!isEndofPuzzle()) {
                const halfSecond = 500
                setTimeout(() => {
                    updatePuzzle(movesArray[moveIndex.current])
                }, halfSecond)
            }else{
                setIsPuzzleOver(true)
            }
            return true;
        } else {
            setTitle("Try Again")
            setTimeout(() => {
                setTitle(title)
            }, 1000)
            return false;
        }
    }
    const isCorrectMove = (move) => {
        return move === movesArray[moveIndex.current]
    }
    const isEndofPuzzle = () => {
        return moveIndex.current >= movesArray.length
    }
    
    const updatePuzzle = (move) => {
        moveLogic.move(move)
        moveIndex.current += 1;
        setShowHint(false)
        setMoveLogic(new Chess(moveLogic.fen()))
    }
    
    //Plays the first move. 
    if (moveIndex.current === 0) {
        moveIndex.current += 1;
        setTimeout(() => {
            moveLogic.move(movesArray[0])
            animationLength.current = 300
            setMoveLogic(new Chess(moveLogic.fen()))
        }, 500)
    }
    return (
        <>
            <Chessboard
                arePiecesDraggable={true} 
                animationDuration={animationLength.current}
                position={moveLogic.fen()}
                onPieceDrop={onDrop}
                onSquareClick={onClick}
                boardOrientation={orientation}
                customBoardStyle={
                    {
                        borderRadius: "24px",
                    }
                }
                showBoardNotation={false}
                customSquareStyles={{
                    ...highlightSquares,
                    ...highlightHint
                }} 
                />
           
        </>
    )
}

export default PuzzleBoard