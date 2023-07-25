import '../SettingsPanel/SettingsPanel.scss'
import { Swipe, Position } from "react-swipe-component"
import {useState} from 'react'
function SettingsPanel({ setIsShowingSettings }) {
    const [position, setPosition] = useState(0)
    const onSwipeRightListener = () => {
        setIsShowingSettings(false)
    }
    const onSwipeListener = (p) => {
        if (p.x !== 0) {
          setPosition(p.x)
        }
    }
    return (
        <>
    <Swipe
            nodeName="div"
            className="panel"
            detectTouch={true}
            delta = "50"
            onSwipedRight={onSwipeRightListener}
            onSwipe={onSwipeListener}
            style={{right: -position + "px"}}
            />
            </>
    )
}




export default SettingsPanel