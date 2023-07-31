import '../SettingsPanel/SettingsPanel.scss'
import { Swipe } from "react-swipe-component"
import { useState} from 'react'
import { useNavigate } from 'react-router'
function SettingsPanel({ setIsShowingSettings, ranges }) {
    const [position, setPosition] = useState(0)
    const [checkedRadio, setCheckedRadio] = useState(localStorage.getItem('difficulty') || "easy")
    const [checkedCategory, setCheckedCategory] = useState(localStorage.getItem('category') || "middlegames")
    const [autoserve, setAutoServe] = useState(localStorage.getItem('autoserve'))
    const [hideTitles, setHideTitles] = useState(localStorage.getItem('hideTitles'))
    const navigate = useNavigate()
    const onSwipeRightListener = () => {
        setIsShowingSettings(false)
    }
    const onSwipeListener = (p) => {
        if (p.x !== 0) {
            setPosition(p.x)
        }
    }
    const onSubmit = (evt) => {
        evt.preventDefault()
        setIsShowingSettings(false)
        localStorage.setItem("difficulty", checkedRadio)
        localStorage.setItem("category", checkedCategory)
        localStorage.setItem("hideTitles", hideTitles)
        localStorage.setItem("autoserve",autoserve)
        navigate(`${checkedCategory}/${checkedRadio}/${Math.ceil(Math.random() * ranges[`${checkedCategory}_${checkedRadio}`])}`)
    }

    return (

        <Swipe
            nodeName="div"
            className="panel panel--animation"
            detectTouch={true}
            detectMouse={false}
            delta="60"
            onSwipedRight={onSwipeRightListener}
            onSwipe={onSwipeListener}
            style={{ right: (16 - position) + "px" }}
        >
            <button className='panel__exit' onClick={() => setIsShowingSettings(false)} />
            <form className='settingsform' onSubmit={onSubmit}>
                <h3 className='settingsform__header'>Settings</h3>
                
                <label htmlFor='difficulty'>Difficulty</label>
                <div className='flex-container'>
                    <p className='settingsform__label settingsform__label--radio'>{capitalize(checkedRadio)}</p>
                    <div className='radiobuttons'>
                        <input type="radio" className='settingsform__radio' id='Easy' name="difficulty" value="easy" defaultChecked={localStorage.getItem('difficulty')==='easy'} onChange={(evt) => setCheckedRadio(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='Medium' name="difficulty" value="medium"defaultChecked={localStorage.getItem('difficulty')==='medium'} onChange={(evt) => setCheckedRadio(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='Hard' name="difficulty" value="hard" defaultChecked={localStorage.getItem('difficulty')==='hard'}onChange={(evt) => setCheckedRadio(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='GM' name="difficulty" value="grandmaster" defaultChecked={localStorage.getItem('difficulty')==='grandmaster'}onChange={(evt) => setCheckedRadio(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='Engine' name="difficulty" value="engine"defaultChecked={localStorage.getItem('difficulty')==='engine'} onChange={(evt) => setCheckedRadio(evt.target.value)} />
                    </div>
                </div>
                
                
                <label htmlFor='category'>Category</label>
                <div className='flex-container'>
                    <p className='settingsform__label settingsform__label--radio'>{capitalize(checkedCategory)}</p>
                    <div className='radiobuttons'>
                        <input type="radio" className='settingsform__radio' id='Middlegames' name="category" value="middlegames" defaultChecked={localStorage.getItem('category')==='middlegames'} onChange={(evt) => setCheckedCategory(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='Endgames' name="category" value="endgames" defaultChecked={localStorage.getItem('category')==='endgames'} onChange={(evt) => setCheckedCategory(evt.target.value)} />
                    </div>
                </div>
                
                <div className='flex-container'>
                    <label htmlFor='hideTitles'>Hide Titles</label>
                    <input type="checkbox" className='settingsform__checkbox' id="hideTitles" name="hideTitle" defaultChecked={localStorage.getItem('hideTitles')==='true'} onChange={(evt) => {setHideTitles(evt.target.checked)}}/>
                </div>
                <div className='flex-container'>
                    <label htmlFor='autoServe'>Serve Puzzles Automatically</label>
                    <input type="checkbox" className='settingsform__checkbox' id="autoserve" name="autoserve"defaultChecked={localStorage.getItem('autoserve')==='true'} onChange={(evt) => setAutoServe(evt.target.checked)}/>
                </div>
               
                <button type="submit" className='settingsform__submit'>New Puzzle</button>

            </form>

        </Swipe>
    )
}
function capitalize(str){
    if(!!str){
        if(str === 'grandmaster')
            return 'GM'
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }
    return null
}



export default SettingsPanel