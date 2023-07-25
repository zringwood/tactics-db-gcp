import '../SettingsPanel/SettingsPanel.scss'
import { Swipe, Position } from "react-swipe-component"
function SettingsPanel({ display }) {
    const onSwipeEnd = () => {
        console.log("Swipe Ended")
    }
    const onSwipeLeftListener = () => {
        console.log("Swiped left")
    }
    const onSwipeRightListener = () => {
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
        <Swipe
            nodeName="div"
            className="panel"
            detectTouch={true}
            onSwipeEnd={onSwipeEnd}
            onSwipedLeft={onSwipeLeftListener}
            onSwipedRight={onSwipeRightListener}
            onSwipedDown={onSwipeDownListener}
            onSwipedUp={onSwipeUpListener}
            onSwipe={onSwipeListener}/>
    )
}




export default SettingsPanel