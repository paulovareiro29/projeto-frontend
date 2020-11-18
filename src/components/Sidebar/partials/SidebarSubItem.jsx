import { React } from "react";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function SidebarSubItem({ title, to, permission }) {

    if(!(permission === undefined || permission === true))
        return null

    return (
        <Link to={to ? to : '#'} className="link">
            <div className="sidebarSubItem">
                <div className="sidebarSubItem-icon">
                    <BsDot />
                </div>
                <div className="sidebarSubItem-content">
                    {title}
                </div>
            </div>
        </Link>
    )
}