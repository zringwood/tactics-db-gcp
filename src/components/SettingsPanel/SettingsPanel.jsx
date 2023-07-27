import '../SettingsPanel/SettingsPanel.scss'
import { Swipe } from "react-swipe-component"
import {useState} from 'react'
function SettingsPanel({ setIsShowingSettings }) {
    const [position, setPosition] = useState(0)
    const [checkedRadio, setCheckedRadio] = useState("Easy")
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
            detectTouch={true}
            detectMouse={false}
            delta = "60"
            onSwipedRight={onSwipeRightListener}
            onSwipe={onSwipeListener}
            style={{right: (16-position) + "px"}}
            >
                <button className='panel__exit' onClick={() => setIsShowingSettings(false)}/>
            <form className='settingsform' >
                <p className='settingsform__label'>{checkedRadio}</p>
                <div className='radiobuttons'>
                <input type="radio" className='settingsform__difficulty--easy' id='Easy' name="difficulty" value={700} defaultChecked onChange={(evt) => setCheckedRadio(evt.target.id)}/>
                <input type="radio" className='settingsform__difficulty--medium' id='Medium' name="difficulty" value={1100} onChange={(evt) => setCheckedRadio(evt.target.id)}/>
                <input type="radio" className='settingsform__difficulty--hard' id='Hard' name="difficulty" value={1500} onChange={(evt) => setCheckedRadio(evt.target.id)}/>
                <input type="radio" className='settingsform__difficulty--grandmaster' id='Grandmaster' name="difficulty" value={1900} onChange={(evt) => setCheckedRadio(evt.target.id)} />
                <input type="radio" className='settingsform__difficulty--engine' id='Engine' name="difficulty" value={2300} onChange={(evt) => setCheckedRadio(evt.target.id)}/>
                </div>
                <label htmlFor='hideTitles'>Hide Titles?</label>
                <input type="checkbox" className='settingsform__titles' id="hideTitles" name="title" />
                <button type="submit" className='settingsform__submit'>New Puzzle</button>
            </form>
            
            </Swipe>
    )
}




export default SettingsPanel