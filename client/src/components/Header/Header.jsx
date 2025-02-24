import logo from '../../assets/drugs.png'
import './header.css'
import settings from '../../assets/gears-solid.svg'


export const Header =()=>{

    return(
        <header className='header'>
            {console.log('render Header')}
            <div className="logo">
                <img src={logo} alt=""  />
                <h1>MediTrack</h1>
            </div>

            <div className="settings">
                <img src={settings} alt="" />
            </div>
        </header>
    )
}

