import '../SettingsPanel/SettingsPanel.scss'
import { Swipe } from "react-swipe-component"
import { useState} from 'react'
import { useNavigate } from 'react-router'
function SettingsPanel({ setIsShowingSettings, ranges }) {
    const [position, setPosition] = useState(0)
    const [checkedRadio, setCheckedRadio] = useState("Easy")
    const [checkedCategory, setCheckedCategory] = useState("Middlegames")
    const [autoserve, setAutoServe] = useState("off")
    const [hideTitles, setHideTitles] = useState("off")
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
        const difficulty = evt.target.difficulty.value;
        setIsShowingSettings(false)
        const category = evt.target.category.value
       
        navigate(`${category}/${difficulty}/${Math.ceil(Math.random() * ranges[`${category}_${difficulty}`])}?hidetitles=${hideTitles}&autoserve=${autoserve}`)
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
                    <p className='settingsform__label settingsform__label--radio'>{checkedRadio}</p>
                    <div className='radiobuttons'>
                        <input type="radio" className='settingsform__radio' id='Easy' name="difficulty" value="easy" defaultChecked onChange={(evt) => setCheckedRadio(evt.target.id)} />
                        <input type="radio" className='settingsform__radio' id='Medium' name="difficulty" value="medium" onChange={(evt) => setCheckedRadio(evt.target.id)} />
                        <input type="radio" className='settingsform__radio' id='Hard' name="difficulty" value="hard" onChange={(evt) => setCheckedRadio(evt.target.id)} />
                        <input type="radio" className='settingsform__radio' id='GM' name="difficulty" value="grandmaster" onChange={(evt) => setCheckedRadio(evt.target.id)} />
                        <input type="radio" className='settingsform__radio' id='Engine' name="difficulty" value="engine" onChange={(evt) => setCheckedRadio(evt.target.id)} />
                    </div>
                </div>
                
                
                <label htmlFor='category'>Category</label>
                <div className='flex-container'>
                    <p className='settingsform__label settingsform__label--radio'>{checkedCategory}</p>
                    <div className='radiobuttons'>
                        <input type="radio" className='settingsform__radio' id='Middlegames' name="category" value="middlegames" defaultChecked onChange={(evt) => setCheckedCategory(evt.target.id)} />
                        <input type="radio" className='settingsform__radio' id='Endgames' name="category" value="endgames" onChange={(evt) => setCheckedCategory(evt.target.id)} />
                    </div>
                </div>
                
                <div className='flex-container'>
                    <label htmlFor='hideTitles'>Hide Titles</label>
                    <input type="checkbox" className='settingsform__checkbox' id="hideTitles" name="hideTitle" onChange={(evt) => setHideTitles(evt.target.value)}/>
                </div>
                <div className='flex-container'>
                    <label htmlFor='autoServe'>Serve Puzzles Automatically</label>
                    <input type="checkbox" className='settingsform__checkbox' id="autoserve" name="autoserve" onChange={(evt) => setAutoServe(evt.target.value)}/>
                </div>
               
                <button type="submit" className='settingsform__submit'>New Puzzle</button>

            </form>

        </Swipe>
    )
}




export default SettingsPanel