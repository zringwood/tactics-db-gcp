import { useState, useEffect, useRef } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import "../PuzzleBoard/PuzzleBoard.scss"

function PuzzleBoard({ positionFEN, movesArray, orientation, showHint, setShowHint, setTitle, title, setIsPuzzleOver }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))
    //Used for click functionality
    const [selectedSquare, setSelectedSquare] = useState(undefined)
    const [highlightSquares, setHighlightSquares] = useState({})
    const [highlightHint, setHightlightHint] = useState({})

    const moveIndex = useRef(0)
    //The initial change of position shouldn't be animated. After that it should be. 
    const animationLength = useRef(0)

    //Resets the state variables for a new puzzle. 
    useEffect(() => {
        animationLength.current = 0
        setMoveLogic(new Chess(positionFEN))
        //moveIndex must be reset when the puzzle resets.
        moveIndex.current = 0;
        setShowHint(false)
    }, [positionFEN, setShowHint])

    //Adds the hint sqaure to an array that the board can display
    useEffect(() => {
        let hintHightlight = {}
        if (showHint && moveIndex.current < movesArray.length)
            hintHightlight[movesArray[moveIndex.current].slice(0, 2)] = { background: "rgba(255, 255, 0, 0.4)" }
        setHightlightHint(hintHightlight)
    }, [showHint, movesArray])

    const onClick = (square) => {
        if (!selectedSquare) {
            updateHighlightSquare(square)
        } else if (isCorrectMove(`${selectedSquare}${square}`)) {
            updatePuzzle(movesArray[moveIndex.current])
            if (!isEndofPuzzle()) {
                opponentMove(movesArray[moveIndex.current])
            } else {
                endPuzzle("You Win!")
            }
            updateHighlightSquare(undefined)
        } else {
            if (square !== selectedSquare) {
                displayWrongMoveText("Try Again!")
            }
            updateHighlightSquare(undefined)
        }


    }

    const onDrop = (sourceSquare, targetSquare) => {
        let move = `${sourceSquare}${targetSquare}`
        if (isCorrectMove(move)) {
            updatePuzzle(movesArray[moveIndex.current])
            if (!isEndofPuzzle()) {
                opponentMove(movesArray[moveIndex.current])
            } else {
                endPuzzle('You Win!')
            }
            return true;
        }
        displayWrongMoveText('Try Again')
        return false;

    }
    const endPuzzle = (endPuzzleMessage) => {
        setTitle(endPuzzleMessage)
        setIsPuzzleOver(true)
    }
    const updateHighlightSquare = (square) => {
        setSelectedSquare(square)
        const newSquares = {}
        newSquares[square] = { background: "rgba(255, 0, 0, 0.4)" }
        setHighlightSquares(newSquares)
    }
    const displayWrongMoveText = (wrongMoveMessage) => {
        setTitle(wrongMoveMessage)
        const ONE_SECOND = 1000;
        setTimeout(() => {
            setTitle(title)
        }, ONE_SECOND)
    }
    const isCorrectMove = (move) => {
        return move.replace('q', '') === movesArray[moveIndex.current]
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
    const opponentMove = (move) => {
        moveIndex.current += 1;
        const HALF_SECOND = 500;
        setTimeout(() => {
            moveLogic.move(move)
            setMoveLogic(new Chess(moveLogic.fen()))
            setShowHint(false)
        }, HALF_SECOND)
    }
    //Plays the first move. 
    if (moveIndex.current === 0) {
        animationLength.current = 300
        opponentMove(movesArray[0])
    }
    return (
        <>
            <Chessboard
                arePiecesDraggable={true}
                animationDuration={animationLength.current}
                position={moveLogic.fen()}
                onPieceDrop={onDrop}
                onSquareClick={onClick}
                autoPromoteToQueen={true}
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