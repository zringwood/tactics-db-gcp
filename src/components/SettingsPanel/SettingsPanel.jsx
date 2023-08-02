import '../SettingsPanel/SettingsPanel.scss'
import { Swipe } from "react-swipe-component"
import { useState} from 'react'
import { useLocation, useNavigate } from 'react-router'
function SettingsPanel({ setIsShowingSettings, ranges }) {
    const [position, setPosition] = useState(0)
    //We don't have access to params because the header is outside of the routes. 
    const defaultSettings = useLocation().pathname.split('/')
    const [category, setCategory] = useState(localStorage.getItem('category') || defaultSettings[1])
    const [difficulty, setDifficulty] = useState(localStorage.getItem('difficulty') || defaultSettings[2])
    const [autoServe, setautoServe] = useState(localStorage.getItem('autoServe'))
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
        localStorage.setItem("difficulty", difficulty)
        localStorage.setItem("category", category)
        localStorage.setItem("hideTitles", hideTitles)
        localStorage.setItem("autoServe",autoServe)
        navigate(`${category}/${difficulty}/${Math.ceil(Math.random() * ranges[`${category}_${difficulty}`])}`)
    }

    return (

        <Swipe
            nodeName="div"
            className="panel panel--animation"
            detectTouch={true}
            detectMouse={false}
            delta="50"
            onSwipedRight={onSwipeRightListener}
            onSwipe={onSwipeListener}
            style={{ right: (16 - position) + "px" }}
        >
            <button className='panel__exit' onClick={() => setIsShowingSettings(false)} />
            <form className='settingsform' onSubmit={onSubmit}>
                <h3 className='settingsform__header'>Settings</h3>
                
                <label htmlFor='difficulty'>Difficulty</label>
                <div className='flex-container'>
                    <p className='settingsform__label settingsform__label--radio'>{titleForm(difficulty)}</p>
                    <div className='radiobuttons'>
                        <input type="radio" className='settingsform__radio' id='Easy' name="difficulty" value="easy" defaultChecked={defaultSettings[2]==='easy'} onChange={(evt) => setDifficulty(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='Medium' name="difficulty" value="medium"defaultChecked={defaultSettings[2]==='medium'} onChange={(evt) => setDifficulty(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='Hard' name="difficulty" value="hard" defaultChecked={defaultSettings[2]==='hard'}onChange={(evt) => setDifficulty(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='GM' name="difficulty" value="grandmaster" defaultChecked={defaultSettings[2]==='grandmaster'}onChange={(evt) => setDifficulty(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='Engine' name="difficulty" value="engine"defaultChecked={defaultSettings[2]==='engine'} onChange={(evt) => setDifficulty(evt.target.value)} />
                    </div>
                </div>
                
                
                <label htmlFor='category'>Category</label>
                <div className='flex-container'>
                    <p className='settingsform__label settingsform__label--radio'>{titleForm(category)}</p>
                    <div className='radiobuttons'>
                        <input type="radio" className='settingsform__radio' id='Middlegames' name="category" value="middlegames" defaultChecked={defaultSettings[1]==='middlegames'} onChange={(evt) => setCategory(evt.target.value)} />
                        <input type="radio" className='settingsform__radio' id='Endgames' name="category" value="endgames" defaultChecked={defaultSettings[1]==='endgames'} onChange={(evt) => setCategory(evt.target.value)} />
                    </div>
                </div>
                
                <div className='flex-container'>
                    <label htmlFor='hideTitles'>Hide Titles</label>
                    <input type="checkbox" className='settingsform__checkbox' id="hideTitles" name="hideTitle" defaultChecked={localStorage.getItem('hideTitles')==='true'} onChange={(evt) => {setHideTitles(evt.target.checked)}}/>
                </div>
                <div className='flex-container'>
                    <label htmlFor='autoServe'>Serve Puzzles Automatically</label>
                    <input type="checkbox" className='settingsform__checkbox' id="autoServe" name="autoServe" defaultChecked={localStorage.getItem('autoServe')==='true'} onChange={(evt) => setautoServe(evt.target.checked)}/>
                </div>
               
                <button type="submit" className='settingsform__submit'>New Puzzle</button>

            </form>

        </Swipe>
    )
}
//Utiltiy method, converts the difficulty category into an acceptable label for the radio buttons. 
function titleForm(str){
    if(!!str){
        if(str === 'grandmaster')
            return 'GM'
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }
    return null
}



export default SettingsPanel