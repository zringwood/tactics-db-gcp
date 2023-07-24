import { NavLink } from 'react-router-dom'
import "../Header/Header.scss"
import { useState } from 'react'
import SettingsPanel from '../SettingsPanel/SettingsPanel'
function Header({ ranges }) {
    const [showSettings, isShowingSettings] = useState(false)
    return (
        <header className='navbar'>
            <NavLink className="navbar__link" to={`/middlegames/${Math.ceil(Math.random() * (ranges.middlegames - 1))}`}><p className='navbar__text'>Middlegames</p></NavLink>
            <NavLink className="navbar__link" to={`/endgames/${Math.ceil(Math.random() * (ranges.endgames - 1))}`}><p className='navbar__text'>Endgames</p></NavLink>
            {showSettings && <SettingsPanel display={showSettings}/>}
            <button className={`navbar__settings ${showSettings && "navbar__settings--animate"}`} onClick={() => isShowingSettings(!showSettings)}></button>
        </header>
    )
}
export default Header