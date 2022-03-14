
import './sidebar.css'
import {LineStyle ,  Analytics , PersonOutline , AttachMoney , Report ,Email ,Chat ,Forum, ManageAccounts ,SettingsApplications, Apartment } from '@mui/icons-material';
import { Link , useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split('/')
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <div className="sidebarList">
                        <Link to="/" className='link' >
                            <li className={`sidebarListItem ${splitLocation[1]===""? "active" : "" }`}>
                                <LineStyle className='sidebarIcons'/>  Home
                            </li>
                        </Link>
                        <Link to="studentlist" className='link'>
                           <li className={`sidebarListItem ${splitLocation[1]==="studentlist"? "active" : "" }`}>
                                <SettingsApplications className='sidebarIcons'/> Manage Grades
                            </li>
                        </Link>
                        <Link to="managecampus" className='link'>
                           <li className={`sidebarListItem ${splitLocation[1]==="managecampus" ? "active" : "" }`}>
                               <Apartment className='sidebarIcons'/> Manage Campus
                            </li>
                        </Link>
                    </div>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <div className="sidebarList">
                        <li className="sidebarListItem">
                            <PersonOutline className='sidebarIcons'/> Users
                        </li>
                         <li className="sidebarListItem">
                            <AttachMoney className='sidebarIcons'/> Transactions
                        </li>
                         <li className="sidebarListItem">
                            <Report className='sidebarIcons'/> Reports
                        </li>
                    </div>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notification</h3>
                    <div className="sidebarList">
                        <li className="sidebarListItem">
                            <Email className='sidebarIcons'/> Mail
                        </li>
                         <li className="sidebarListItem">
                            <Forum className='sidebarIcons'/> Feedback
                        </li>
                         <li className="sidebarListItem">
                            <Chat className='sidebarIcons'/> Messages
                        </li>
                    </div>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <div className="sidebarList">
                        <li className="sidebarListItem">
                            <ManageAccounts className='sidebarIcons'/> Manage
                        </li>
                         <li className="sidebarListItem">
                            <Analytics className='sidebarIcons'/> Analytics
                        </li>
                         <li className="sidebarListItem">
                            <Report className='sidebarIcons'/> Reports
                        </li>
                    </div>
                </div>
                
            </div>
          
        </div>
    )
}
