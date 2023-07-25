import '../SettingsPanel/SettingsPanel.scss'
import { Swipe } from "react-swipe-component"
import {useState} from 'react'
function SettingsPanel({ setIsShowingSettings, animate }) {
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
            className="panel panel--animation"
            detectTouch={true}
            delta = "65"
            onSwipedRight={onSwipeRightListener}
            onSwipe={onSwipeListener}
            // style={{right: (16-position) + "px"}}
            />
            </>
    )
}




export default SettingsPanel