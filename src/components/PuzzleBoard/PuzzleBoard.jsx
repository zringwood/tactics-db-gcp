import { useState, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"

//This doesn't work with state because setState is asynchronous.  
let moveIndex = 0;
function PuzzleBoard({ positionFEN, movesArray, orientation }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))
    //Logic to perform an animation when the wrong move is played
    const [isWrongMove, setIsWrongMove] = useState(false)
    //This is needed to trigger a rerender in the chessboard component. 
    useEffect(() => {
        setMoveLogic(new Chess(positionFEN));
        //moveIndex must be reset when the puzzle resets.
        moveIndex = 0;
    }, [positionFEN])
    const onDrop = (sourceSquare, targetSquare) => {
        let move = `${sourceSquare}${targetSquare}`
        if (isCorrectMove(move)) {
            updatePuzzle(move)
            if (!isEndofPuzzle()) {
                const halfSecond = 500
                setTimeout(() => {
                    updatePuzzle(movesArray[moveIndex])
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
        return move === movesArray[moveIndex]
    }
    const isEndofPuzzle = () => {
        return moveIndex >= movesArray.length
    }
    const updatePuzzle = (move) => {
        moveLogic.move(move)
        moveIndex += 1;
        setMoveLogic(new Chess(moveLogic.fen()))
    }
    //Plays the first move. 
    if (moveIndex === 0) {
        moveIndex += 1;
        setTimeout(() => {
            moveLogic.move(movesArray[0])
            setMoveLogic(new Chess(moveLogic.fen()))
        }, 500)
    }
    return (
        <>
            <Chessboard position={moveLogic.fen()} onPieceDrop={onDrop} boardOrientation={orientation} customBoardStyle={{boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 ',
    borderRadius: "24px"}}/>
            {moveIndex >= movesArray.length && <p>You Win!</p>}
           {isWrongMove && <p> Try Again!</p>}
        </>
    )
}

export default PuzzleBoard