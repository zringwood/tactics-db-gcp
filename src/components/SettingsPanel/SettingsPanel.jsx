import '../SettingsPanel/SettingsPanel.scss'
import { Swipe } from "react-swipe-component"
import {useState} from 'react'
function SettingsPanel({ setIsShowingSettings }) {
    const [position, setPosition] = useState(0)
    const [difficulty, setDifficulty] = useState(1)
    const [isSwipeEnabled, setIsSwipeEnabled] = useState(true)

    const onSwipeRightListener = () => {
        
        setIsShowingSettings(false)
    }
    const onSwipeListener = (p) => {
        
        if (p.x !== 0) {
          setPosition(p.x)
        }
    }
    return (
        
    <Swipe
            nodeName="div"
            className="panel panel--animation"
            detectTouch={isSwipeEnabled}
            detectMouse={false}
            delta = "60"
            onSwipedRight={onSwipeRightListener}
            onSwipe={onSwipeListener}
            style={{right: (16-position) + "px"}}
            >
            <form className='settingsform' onMouseEnter={() => setIsSwipeEnabled(false)} 
                onMouseLeave={() => setIsSwipeEnabled(true)}>
                <label htmlFor='easy' className='settingsform__label'>Easy</label>
                <input type="radio" className='settingsform__difficulty--easy' id='easy' name="difficulty" value={700} />
                <label htmlFor='medium' className='settingsform__label'>Medium</label>
                <input type="radio" className='settingsform__difficulty--medium' id='medium' name="difficulty" value={1100} />
                <label htmlFor='hard' className='settingsform__label'>Hard</label>
                <input type="radio" className='settingsform__difficulty--hard' id='hard' name="difficulty" value={1500} />
                <label htmlFor='grandmaster' className='settingsform__label'>Grandmaster</label>
                <input type="radio" className='settingsform__difficulty--grandmaster' id='grandmaster' name="difficulty" value={1900} />
                <label htmlFor='engine' className='settingsform__label'>Engine</label>
                <input type="radio" className='settingsform__difficulty--engine' id='engine' name="difficulty" value={2300} />
                <button type="submit" className='settingsform__submit'>New Puzzle</button>
            </form>
            </Swipe>
    )
}




export default SettingsPanel