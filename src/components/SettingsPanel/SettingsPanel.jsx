import '../SettingsPanel/SettingsPanel.scss'
import { Swipe } from "react-swipe-component"
import {useState} from 'react'
function SettingsPanel({ setIsShowingSettings, animate }) {
    const [position, setPosition] = useState(0)
    const [difficulty, setDifficulty] = useState(1)
    
    const onSwipeRightListener = () => {
        setIsShowingSettings(false)
    }
    const onSwipeListener = (p) => {
        // if (p.x !== 0) {
        //   setPosition(p.x)
        // }
    }
    return (
        
    <Swipe
            nodeName="div"
            className="panel panel--animation"
            detectTouch={true}
            detectMouse={false}
            delta = "60"
            onSwipedRight={onSwipeRightListener}
            onSwipe={onSwipeListener}
            style={{right: (16-position) + "px"}}
            >
            <form className='settingsform'>
                <label htmlFor='settingsform__difficulty' className='settingsform__label'>Difficulty</label>
                <input type="range" className='settingsform__difficulty' id='settingsform__difficulty' name="difficulty" min="700" max="2500" value={difficulty} onChange={(evt) => setDifficulty(evt.target.value)}/>
                <button type="submit" className='settingsform__submit'>New Puzzle</button>
            </form>
            </Swipe>
    )
}




export default SettingsPanel