import { React } from "react";

export default function SidebarMenu({title, permission, children}){
    if(permission === undefined)
        permission = true

    return (
        permission ? 
        <div className="sidebar-menu">
            {(title ? <div className="sidebar-menu-title">
                {title}
            </div> : null)}
            <div className="sidebar-menu-content">
                {children}
            </div>
        </div> : null   
    )
}