import { TestsState, TestAction, ITest, FilterOptions, SortOptions } from '../type'
import { SORT_BY_NAME, SORT_BY_PACKAGE, FILTER_BY_NAME, FILTER_BY_PACKAGE } from './actionTypes'
import initialState from '../tests.json'

function descendingComparator(lhs: ITest, rhs: ITest, orderBy: string): number {
    switch (orderBy) {
        case 'name':
            return lhs.name.localeCompare(rhs.name)
        default:
            return 0
    }
}

function getComparator(order: string, orderBy: string): (rhs: ITest, lhs: ITest) => number {
    return order === 'desc'
        ? (a: ITest, b: ITest) => descendingComparator(a, b, orderBy)
        : (a: ITest, b: ITest) => -descendingComparator(a, b, orderBy)
}

function stableSort(reports: ITest[], comparator: (lhs: ITest, rhs: ITest) => number): ITest[] {
    const stabilizedThis: [ITest, number][] = reports.map((el: ITest, index: number) => [el, index])
    stabilizedThis.sort((lhs: [ITest, number], rhs: [ITest, number]) => {
        const order = comparator(lhs[0], rhs[0])
        if (order !== 0) return order
        return lhs[1] - rhs[1]
    })
    return stabilizedThis.map(el => el[0])
}

const reducer = (state: TestsState = initialState, action: TestAction): TestsState => {
    switch (action.type) {
        case SORT_BY_NAME: {
            const option = action.payload as SortOptions
            return stableSort(state, getComparator(option.direction, 'name'))
        }
        case SORT_BY_PACKAGE:
            return state
        case FILTER_BY_NAME: {
            const option = action.payload as FilterOptions
            const filtered = initialState.filter((test: ITest) => {
                return test.name.toLowerCase().includes(option.text)
            })
            return filtered
        }
        case FILTER_BY_PACKAGE:
            return state
        default:
            return state
    }
}

export default reducer
