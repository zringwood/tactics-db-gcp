import { NavLink } from 'react-router-dom'
import "../Header/Header.scss"
import { useState } from 'react'
import SettingsPanel from '../SettingsPanel/SettingsPanel'
function Header({ranges}) {
    const [isShowingSettings, setIsShowingSettings] = useState(false)
    return ( 
        <header className='navbar'>
            <NavLink className="navbar__link" to={`/`}><p className='navbar__text'>Middlegames</p></NavLink>
            <NavLink className="navbar__link" to={`/`}><p className='navbar__text'>Endgames</p></NavLink>
            {isShowingSettings && <SettingsPanel setIsShowingSettings={setIsShowingSettings} ranges={ranges}/>}
            <button className={`navbar__settings ${isShowingSettings && "navbar__settings--animate"}`} onClick={() => setIsShowingSettings(!isShowingSettings)}></button>
        </header>
    )
}
export default Header