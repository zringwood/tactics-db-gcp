import "../Header/Header.scss"
import { useState } from 'react'
import SettingsPanel from '../SettingsPanel/SettingsPanel'
function Header({ranges}) {
    const [isShowingSettings, setIsShowingSettings] = useState(false)
    return ( 
        <header className='navbar'>
            {isShowingSettings && <SettingsPanel setIsShowingSettings={setIsShowingSettings} ranges={ranges}/>}
            <button className='navbar__settings' onClick={() => setIsShowingSettings(!isShowingSettings)}></button>
            <h2 className="navbar__title">Tactics DB</h2>
        </header>
    )
}
export default Header