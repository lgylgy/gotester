export interface ITest {
    name: string
    file?: string
    package?: string
}

export type TestsState = ITests[]

export interface FilterOptions {
    text: string
}

export interface SortOptions {
    direction: string
}

export type TestAction = {
    type: string;
    payload: FilterOptions | SortOptions;
}