import React from 'react'
import {NotificationsNone , Language , Settings} from '@mui/icons-material';
import './topbar.css'
function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">
                        amanmulat
                    </span>
                </div>
                <div className="topRight">
                    <div className="topbarIconcontainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconcontainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconcontainer">
                        <Settings />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topAvataContainer">
                    <img src="https://avatars.dicebear.com/api/pixel-art-neutral/black.svg" alt="Avatar" className="topAvatar" />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar
