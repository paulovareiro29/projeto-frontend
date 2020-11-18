import { React, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";


export default function SidebarItem({ icon: Icon, title, to, permission, children }) {
    const [state, setState] = useState(false)

    const toggle = () => {
        state ? setState(false) : setState(true)
    }

    if(!(permission === undefined || permission === true))
        return null

    if (children) {
        return (
            <>
                <div className="sidebar-item menu" onClick={toggle}>
                    <div className="sidebar-item-icon">
                        <Icon color={"#ffffff"} />
                    </div>
                    <div className="sidebar-item-content">
                        {title}
                    </div>
                    <div className={"sidebar-item-submenuIcon " + (state ? 'open' : '')}>
                        <RiArrowRightSLine size={25} />
                    </div>
                </div>
                <div className={`sidebar-item-subcontent ` + (state ? '' : 'closed')}>
                    {children}
                </div>
            </>
        )
    } else {
        return (
            <Link to={to} className="link">
                <div className="sidebar-item " onClick={toggle}>
                    <div className="sidebar-item-icon">
                        <Icon color={"#ffffff"} />
                    </div>
                    <div className="sidebar-item-content">
                        {title}
                    </div>
                </div>
            </Link>
        )
    }
}
