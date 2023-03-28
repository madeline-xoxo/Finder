interface IIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: string;
}

export default function File(props: IIconProps) {
    return (
        <div className="file">
            <div className="file-contents">
                <img className="file-icon" src={props.icon} />
                <div className="file-label">{props.children}</div>
            </div>
        </div>
    )
}