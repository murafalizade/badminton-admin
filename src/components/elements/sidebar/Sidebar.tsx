import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/logos/infoSystemLogo.svg'
import newsLogo from '../../../assets/logos/newsLogo.svg'
import docLogo from '../../../assets/logos/docLogo.svg'
import achiveLogo from '../../../assets/logos/achieveLogo.svg'
import './Sidebar.scss'

export const Sidebar = () => {

    const { pathname } = useLocation();
    console.log(pathname)

    //choose current page
    const selectCurrentPage = (pageName: string): boolean => {
        if (pathname === pageName)
            return true
        else
            return false
    }

    return (
        <div className='admin-sidebar'>
            <img className='brand-img' src={logo} alt='logo' />
            <ul>
                <li><NavLink className={selectCurrentPage('/dashboard/achievements') ? 'selected' : ''} to='/dashboard/achievements'><img src={achiveLogo} alt='achievment logo' />Naliyyətlər</NavLink></li>
                <li><NavLink className={selectCurrentPage('/dashboard/news') ? 'selected' : ''} to='/dashboard/news'><img src={newsLogo} alt='news logo' />Xəbərlər</NavLink></li>
                <li><NavLink className={selectCurrentPage('/dashboard/galeries') ? 'selected' : ''} to='/dashboard/galeries'><img src={docLogo} alt='galary logo' />Qalereya</NavLink></li>
            </ul>
        </div>
    )
}
