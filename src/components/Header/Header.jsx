import { NavLink } from 'react-router-dom'
import "../Header/Header.scss"
import { useState } from 'react'
import SettingsPanel from '../SettingsPanel/SettingsPanel'
function Header({ ranges }) {
    const [isShowingSettings, setIsShowingSettings] = useState(false)
    return ( 
        <header className='navbar'>
            <NavLink className="navbar__link" to={`/middlegames/${Math.ceil(Math.random() * (ranges.middlegames - 1))}`}><p className='navbar__text'>Middlegames</p></NavLink>
            <NavLink className="navbar__link" to={`/endgames/${Math.ceil(Math.random() * (ranges.endgames - 1))}`}><p className='navbar__text'>Endgames</p></NavLink>
            {isShowingSettings && <SettingsPanel setIsShowingSettings={setIsShowingSettings}/>}
            <button className={`navbar__settings ${isShowingSettings && "navbar__settings--animate"}`} onClick={() => setIsShowingSettings(!isShowingSettings)}></button>
        </header>
    )
}
export default Header