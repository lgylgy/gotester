import { ITestsState, TestAction, ITest, IFilterOptions, ISortOptions } from '../type'
import {
    SORT_BY_NAME,
    SORT_BY_PACKAGE,
    FILTER_BY_NAME,
    FILTER_BY_PACKAGE,
    LOAD_PAGE,
    CHANGE_COUNT
} from './actionTypes'
import tests from '../tests.json'

const defaultTestsPerPage = 10

const initialState: ITestsState = {
    initial: tests,
    tests: tests.slice(0, defaultTestsPerPage),
    count: tests.length,
    currentPage: 0,
    testsPerPage: defaultTestsPerPage,
    filtered: ''
}

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

const reducer = (state: ITestsState = initialState, action: TestAction): ITestsState => {
    switch (action.type) {
        case SORT_BY_NAME: {
            const option = action.payload as ISortOptions
            return {
                ...state,
                tests: stableSort(state.tests, getComparator(option.direction, 'name'))
            }
        }
        case SORT_BY_PACKAGE:
            return state
        case FILTER_BY_NAME: {
            const option = action.payload as IFilterOptions
            if (option.text === '') {
                return {
                    ...state,
                    tests: state.initial.slice(
                        state.currentPage * state.testsPerPage,
                        state.currentPage * state.testsPerPage + state.testsPerPage
                    ),
                    filtered: '',
                    count: state.initial.length
                }
            }
            const value = state.tests.filter((test: ITest) => {
                return test.name.toLowerCase().includes(option.text.toLowerCase())
            })
            return {
                ...state,
                filtered: option.text,
                tests: value,
                count: value.length
            }
        }
        case LOAD_PAGE:
            const newPage = action.payload as number
            const value = state.initial
                .slice(
                    newPage * state.testsPerPage,
                    newPage * state.testsPerPage + state.testsPerPage
                )
                .filter((test: ITest) => {
                    return (
                        state.filtered === '' ||
                        test.name.toLowerCase().includes(state.filtered.toLowerCase())
                    )
                })
            const value2 = state.initial.filter((test: ITest) => {
                return (
                    state.filtered === '' ||
                    test.name.toLowerCase().includes(state.filtered.toLowerCase())
                )
            })
            return {
                ...state,
                currentPage: newPage,
                tests: value,
                count: value2.length
            }
        case CHANGE_COUNT:
            const count = action.payload as number
            const page = 0
            const filtered = ''
            return {
                ...state,
                tests: state.initial.slice(page * count, page * count + count),
                currentPage: page,
                testsPerPage: count,
                filtered: filtered,
                count: state.initial.length
            }
        case FILTER_BY_PACKAGE:
            return state
        default:
            return state
    }
}

export default reducer
