import { useState, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"

let moveIndex = 0
function PuzzleBoard({ positionFEN, movestrPGN }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))
    const [position, setPosition] = useState(positionFEN)
    //We updated the state variables using usEffect so that they actually change on load
    useEffect(() => {
        setPosition(positionFEN);
        setMoveLogic(new Chess(positionFEN));
        //moveIndex must be reset when the puzzle resets.
        moveIndex = 0;
    }, [positionFEN])
    
    const delayInMillis = 500
    const moveNumberOrGameResult = /(\d\.|[01]-[01])+/
    //Convert the move string to a move array and gut the headers. 
    let movesArray = movestrPGN.split(' ').filter((element) => !element.match(moveNumberOrGameResult))
   
    const onDrop = (sourceSquare, targetSquare) => {
        let moveAlgebraic = convertObjectToAlgebraic(sourceSquare, targetSquare)
        
        if (isCorrectMove(moveAlgebraic)) {
            updatePuzzle(moveAlgebraic)
        }
        if (!isEndofPuzzle()) {
            setTimeout(() => {
                updatePuzzle(movesArray[moveIndex])
            }, delayInMillis)
        }
    }
    const convertObjectToAlgebraic = (sourceSquare, targetSquare) => {
        return `${moveLogic.get(sourceSquare).type.toUpperCase()}${!!moveLogic.get(targetSquare).type ? 'x' : ''}${targetSquare}`
    }
    const isCorrectMove = (moveAlgebraic) => {
        const specialPGNCharacters = /([#+])+/
        const noCharacter = ''
        return moveAlgebraic === movesArray[moveIndex].replace(specialPGNCharacters, noCharacter)
    }
    const isEndofPuzzle = () => {
        return moveIndex >= movesArray.length
    }
    const updatePuzzle = (moveAlgebraic) => {
        moveLogic.move(moveAlgebraic)
        moveIndex += 1
        setPosition(moveLogic.fen())
    }
    return (
        <>
            <Chessboard position={position} onPieceDrop={onDrop} />
            {moveIndex >= movesArray.length && <p>You Win!</p>}
        </>
    )
}

export default PuzzleBoard