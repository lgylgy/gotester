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
import tests from '../tests.json'
import { HeaderTableTests } from './HeaderTableTests'

interface IState {
    orderBy: string
    order: 'asc' | 'desc'
    page: number
    rowsPerPage: number
}

interface IProps {}

const ROWS_PER_PAGE_OPTION = [10, 25, 50]

export class TableTests extends React.Component<IProps, IState> {
    public state: IState = {
        orderBy: 'name',
        order: 'desc',
        page: 0,
        rowsPerPage: 10
    }

    private handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => {
        this.setState({
            page: page
        })
    }

    private handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        this.setState({
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        })
    }

    private handleRequestSort = (property: string) => {
        const { orderBy, order } = this.state
        const isAsc = orderBy === property && order === 'asc'
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        })
    }

    render(): JSX.Element {
        const { order, orderBy, page, rowsPerPage } = this.state
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <HeaderTableTests
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                        />
                        <TableBody>
                            {tests
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((test: any, index: number) => {
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
                {tests.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={ROWS_PER_PAGE_OPTION}
                        component="div"
                        count={tests.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        labelRowsPerPage="Tests per page:"
                        SelectProps={{
                            native: true
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                    />
                )}
            </div>
        )
    }
}
