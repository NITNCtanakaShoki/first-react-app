import { useState } from 'react'
import FizzBuzz from "@/components/FizzBuzz"

const HelloWorld = (): JSX.Element => {

    const [fizzBuzz, setFizzBuzz] = useState<FizzBuzz>(FizzBuzz.init)

    const increment = () => setFizzBuzz(fizzBuzz.incremented())

    return (
        <>
            <span>{fizzBuzz.value()}</span>
            <button onClick={increment}>+</button>
        </>
    )
}

export default HelloWorld