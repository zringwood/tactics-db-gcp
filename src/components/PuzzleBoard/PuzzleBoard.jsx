import { useState, useEffect, useRef } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"


function PuzzleBoard({ positionFEN, movesArray, orientation }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))
    //Logic to perform an animation when the wrong move is played
    const [isWrongMove, setIsWrongMove] = useState(false)
    //Used for click functionality
    const [selectedSquare, setSelectedSquare] = useState(undefined)
    //Used for highlighting squares
    const [highlightSquares, setHighlightSquares] = useState({})
    const moveIndex = useRef(0)
    console.log(movesArray)
    //This is needed to trigger a rerender in the chessboard component. 
    useEffect(() => {
        setMoveLogic(new Chess(positionFEN));
        //moveIndex must be reset when the puzzle resets.
        moveIndex.current = 0;
    }, [positionFEN])

    const onSquareClick = (square) => {
        console.log(moveIndex.current, `${selectedSquare}${square}`)
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
            }
            setSelectedSquare(undefined)
            setHighlightSquares({})
        }
        else {
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
            }
        } else {
            setIsWrongMove(true)
            setTimeout(() => {
                setIsWrongMove(false)
            }, 1000)
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
        setMoveLogic(new Chess(moveLogic.fen()))
    }
    //Plays the first move. 
    if (moveIndex.current === 0) {
        moveIndex.current += 1;
        setTimeout(() => {
            moveLogic.move(movesArray[0])
            setMoveLogic(new Chess(moveLogic.fen()))
        }, 500)
    }
    return (
        <>
            <Chessboard position={moveLogic.fen()}
                onPieceDrop={onDrop}
                onSquareClick={onSquareClick}
                boardOrientation={orientation}
                customBoardStyle={
                    {
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 ',
                        borderRadius: "24px"
                    }
                }
                customSquareStyles={{
                    ...highlightSquares
                }} />
            {moveIndex.current >= movesArray.length && <p>You Win!</p>}
            {isWrongMove && <p> Try Again!</p>}
        </>
    )
}

export default PuzzleBoard