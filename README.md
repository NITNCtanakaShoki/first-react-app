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
- 