import { useMemo, useState } from 'react'
import './App.css'
import HelloWorld from '@/components/HelloWorld'
import Input from "@/components/Input"

function App() {

    const [text, setText] = useState('')

    const reversed = useMemo(() => {
        return text.split('').reverse().join('');
    }, [text])

    // const reversed = text.split('').reverse().join('')

    return (
        <div className="App">
            <HelloWorld/>
            <p>{reversed}</p>
            <Input model={setText}/>
        </div>
    )
}

export default App
