export interface ITest {
    name: string
    file?: string
    package?: string
}

export interface ITestsState {
    readonly initial: ITests[]
    tests: ITests[]
    currentPage: number
    testsPerPage: number
    count: number
    filtered: string
}

export interface IFilterOptions {
    text: string
}

export interface ISortOptions {
    direction: string
}

export type TestAction = {
    type: string
    payload: FilterOptions | SortOptions
}
