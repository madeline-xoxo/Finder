import React from "react";

interface ISidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: string;
    children: any;
    dataLocation: string;
}

export default function SidebarItem(props: ISidebarItemProps) {
    return (
        <div onMouseDown={props.onMouseDown} data-location={props.dataLocation} className="sidebarItem list-selected">
            <img className="icon" src={props.icon} />
            <div>{props.children}</div>
        </div>
    )
}