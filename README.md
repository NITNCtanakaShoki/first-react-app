# Reactの使い方

## プロジェクト作成
```shell
npm create vite@latest
```

## path alias
@/でsrc/と同義に、~/でpublic/と同義にaliasをはる

1. ライブラリを入れる
```shell
npm i -D vite-tsconfig-paths
```

2. vite.config.tsを設定
```ts
export default defineConfig({
  plugins: [
      react(),
      tsconfigPaths(), // 追加
  ]
})
```

3. tsconfig.jsonを設定
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "~/*": ["public/*"]
    }
  }
}
```

## Componentの作成

App.tsx
```tsx
import './App.css'
import HelloWorld from '@/components/HelloWorld'

function App() {
  return (
    <div className="App">
        <HelloWorld/>
    </div>
  )
}

export default App
```


HelloWorld.tsx
```tsx
import { useState } from 'react'
import FizzBuzz from "@/components/FizzBuzz"

const HelloWorld = (): JSX.Element => {

    const [fizzBuzz, setFizzBuzz] = useState<FizzBuzz>(FizzBuzz.init)

    const increment = (): void => setFizzBuzz(fizzBuzz.incremented())

    return (
        <div className="HelloWorld">
            <span>{fizzBuzz.value()}</span>
            <button onClick={increment}>+</button>
        </div>
    )
}

export default HelloWorld
```


FizzBuzz.ts
```ts
export default class FizzBuzz {
    private constructor(
        private readonly number: number
    ) {
        if (!FizzBuzz.isValid(number)) throw new Error('is NOT Valid As FizzBuzz Number')
    }

    private static isValid = (number: number): boolean => {
        return Number.isInteger(number)
    }

    public static readonly init = new FizzBuzz(0)

    public readonly value = (): string => {
        if (this.isFizzBuzz()) return FizzBuzz.FIZZ_BUZZ
        if (this.isFizz()) return FizzBuzz.FIZZ
        if (this.isBuzz()) return FizzBuzz.BUZZ
        return String(this.number)
    }

    public readonly incremented = (): FizzBuzz => {
        return new FizzBuzz(this.number + 1)
    }

    private static readonly FIZZ = 'Fizz'
    private static readonly BUZZ = 'Buzz'
    private static readonly FIZZ_BUZZ = this.FIZZ + this.BUZZ

    private readonly isFizz = (): boolean => this.isDividable(3)

    private readonly isBuzz = (): boolean => this.isDividable(5)

    private readonly isFizzBuzz = (): boolean => this.isFizz() && this.isBuzz()

    private readonly isDividable = (by: number): boolean => {
        return this.number % by === 0
    }
}
```

### わかったこと
- import時に.tsxの拡張子は書かなくていい
- useStateはGenerics型指定しないとany型を受け入れる
- Generics指定したuseStateはIDEではエラー吐くけど、ブラウザでは動いてしまう
- コンポーネントは1つのタグ（まとまり）しか返せないが、<></>という空タグで囲ってしまえば実際のHTMLには出てこない

## InputElementの双方向バインディング(v-model)

Input.tsx
```tsx
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
```

App.tsx
```tsx
import { useMemo, useState } from 'react'
import './App.css'
import Input from "@/components/Input"

function App() {

    const [text, setText] = useState<string>('')

    return (
        <div className="App">
            <p>{text}</p>
            <Input model={setText}/>
        </div>
    )
}

export default App
```

ReactのEventが独自型だということはわかった。ただTypeScriptでGenericsで型が扱いやすくなってるところに魅力を感じられる。

## computed（リアクティブな演算値）

### 多分DOMの変更全てに対して検知して再演算するタイプのリアクティブ
```ts
const reversed = text.split('').reverse().join('')
```
仕組みがVueよりも全くわからないわからないのでキモい。噂のJavaScriptらしいReactじゃない。キモい


### 特定の変数だけ監視して、特定の変数が変わったときのみ再演算するだろうタイプのリアクティブ
```ts
const reversed = useMemo(() => {
    return text.split('').reverse().join('');
}, [text])
```
こっちの方がVueと同じだし、なんならVueよりも仕組みがはっきりわかっていて良き
ただ使い方覚えるのが面倒くさいs