import { ChangeEvent, useState } from 'react'

const Input = (props: { text?: string, model: (value: string) => void }): JSX.Element => {

    const [text, setText] = useState<string>(props.text ?? '');

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value)
        props.model(event.target.value)
    }
    return (
        <input type="text" value={text} onChange={onChange} />
    )
}

export default Input
