type AvatarProps = {
    name: string
}

export default function Avatar( props: AvatarProps) {
    const { name } = props
    const list = name.split("")
    const firstLetter = list[0].toUpperCase()

    return (
        <>
        <p className="avatar">{ firstLetter }</p>
        </>
    )
}