interface ISidebarItemProps {
    icon: string;
    children: any;
}

export default function SidebarItem(props: ISidebarItemProps) {
    return (
        <div className="sidebarItem">
        <img className="icon" src={props.icon} />
        <div>{props.children}</div>
      </div>
    )
}