import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Headers from './Headers'
import { ITest, ITestsState } from '../type'
import { CHANGE_COUNT, LOAD_PAGE } from '../store/actionTypes'

interface IState {}

interface IProps {
    state: ITestsState
    newPage: (page: number) => void
    changeCount: (count: number) => void
}

const ROWS_PER_PAGE_OPTION = [10, 25, 50]

class TableTests extends React.Component<IProps, IState> {
    public state: IState = {}

    private handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        this.props.newPage(newPage)
    }

    private handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        this.props.changeCount(parseInt(event.target.value, 10))
    }

    render(): JSX.Element {
        const state = this.props.state
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <Headers />
                        <TableBody>
                            {state.tests.map((test: ITest, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <IconButton aria-label="expand row" size="small">
                                                <KeyboardArrowDownIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {test.name}
                                        </TableCell>
                                        <TableCell align="right">package</TableCell>
                                        <TableCell align="right">actions</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTION}
                    component="div"
                    count={state.count}
                    rowsPerPage={state.testsPerPage}
                    page={state.currentPage}
                    labelRowsPerPage="Tests per page:"
                    SelectProps={{
                        native: true
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: ITestsState) => {
    return { state }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        newPage: (page: number) =>
            dispatch({
                type: LOAD_PAGE,
                payload: page
            }),
        changeCount: (count: number) =>
            dispatch({
                type: CHANGE_COUNT,
                payload: count
            })
    }
}

export const TableTestsStore = connect(mapStateToProps, mapDispatchToProps)(TableTests)
