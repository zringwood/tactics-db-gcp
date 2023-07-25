import '../SettingsPanel/SettingsPanel.scss'
import { Swipe, Position } from "react-swipe-component"
import {useState} from 'react'
function SettingsPanel({ setIsShowingSettings }) {

    const onSwipeEnd = () => {
        console.log("Swipe Ended")
    }
    const onSwipeRightListener = () => {
        setIsShowingSettings(false)
    }
    const onSwipeLeftListener = () => {
        console.log("Swiped right")
    }
    const onSwipeUpListener = () => {
        console.log("Swiped Up")
    }
    const onSwipeDownListener = () => {
        console.log("Swiped down")
    }
    const onSwipeListener = (p) => {
        if (p.x !== 0) {
            console.log(`Swipe x: ${p.x}`)
        }
        if (p.y !== 0) {
            console.log(`Swipe y: ${p.y}`)
        }
    }
    return (
        <>
    <Swipe
            nodeName="div"
            className="panel"
            detectTouch={true}
            delta = "25"
            onSwipeEnd={onSwipeEnd}
            onSwipedLeft={onSwipeLeftListener}
            onSwipedRight={onSwipeRightListener}
            onSwipedDown={onSwipeDownListener}
            onSwipedUp={onSwipeUpListener}
            onSwipe={onSwipeListener}/>
            </>
    )
}




export default SettingsPanel