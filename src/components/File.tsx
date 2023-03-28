import React from "react";

interface IFileProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: string;
    children: any;
    selected: boolean;
}

export default function File(props: IFileProps) {
    return (
        <div onDoubleClick={props.onDoubleClick} onMouseDown={props.onMouseDown} className={`fileItem`}>
            <img className="icon" src={props.icon} />
            <div>{props.children}</div>
        </div>
    )
}