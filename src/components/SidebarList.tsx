export default function SidebarList(props: any) {
    return (
        <ul className="collapsible">
            <li>
                <div className="collapsible-header">PLACES</div>
                <div className="collapsible-body">
                    <ul>
                        {props.children}
                    </ul>
                </div>
            </li>
        </ul>
    )
}