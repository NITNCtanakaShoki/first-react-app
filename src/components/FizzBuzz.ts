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