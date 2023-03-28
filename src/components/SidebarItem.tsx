import React from "react";

interface ISidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: string;
    children: any;
    dataLocation: string;
    selected: boolean;
}

export default function SidebarItem(props: ISidebarItemProps) {
    return (
        <div onMouseDown={props.onMouseDown} data-location={props.dataLocation} className={`sidebarItem ${props.selected ? 'list-selected' : null}`}>
            <img className="icon" src={props.icon} />
            <div>{props.children}</div>
        </div>
    )
}