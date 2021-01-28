import React from 'react'
import { Dispatch } from 'redux'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { SORT_BY_NAME, SORT_BY_PACKAGE } from '../store/actionTypes'
import { connect } from 'react-redux'

interface IProps {
    sortByName: (text: string) => void
    sortByPackage: (text: string) => void
}

interface IState {
    orderBy: string
    order: 'asc' | 'desc'
}

function renderHeader(
    sortable: boolean,
    orderBy: string,
    label: string,
    order: 'asc' | 'desc',
    onRequestSort: (property: string) => void
): JSX.Element {
    if (sortable) {
        return (
            <TableSortLabel
                active={orderBy === label}
                direction={orderBy === label ? order : 'asc'}
                onClick={() => onRequestSort(label)}>
                {label}
            </TableSortLabel>
        )
    }
    return (
        <TableSortLabel active={false} hideSortIcon={true}>
            {label}
        </TableSortLabel>
    )
}

class Headers extends React.Component<IProps, IState> {
    public state: IState = {
        orderBy: 'name',
        order: 'desc'
    }

    private handleRequestSort = (property: string) => {
        const { orderBy, order } = this.state
        const isAsc = orderBy === property && order === 'asc'
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        })
        switch (this.state.orderBy) {
            case 'name':
                return this.props.sortByName(this.state.order)
            case 'package':
                return this.props.sortByPackage(this.state.order)
            default:
                return
        }
    }

    public render(): JSX.Element {
        const { order, orderBy } = this.state
        const headCells = [
            {
                label: '',
                width: '10%',
                sortable: false
            },
            {
                label: 'name',
                width: '50%',
                sortable: true
            },
            {
                label: 'package',
                width: '20%',
                sortable: true
            },
            {
                label: 'actions',
                width: '20%',
                sortable: false
            }
        ]
        return (
            <TableHead>
                <TableRow>
                    {headCells.map(headCell => (
                        <TableCell
                            key={headCell.label}
                            sortDirection={orderBy === headCell.label ? order : false}>
                            {renderHeader(headCell.sortable, orderBy, headCell.label, order, () =>
                                this.handleRequestSort(headCell.label)
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sortByName: (direction: string) =>
            dispatch({
                type: SORT_BY_NAME,
                payload: { direction: direction }
            }),
        sortByPackage: (direction: string) =>
            dispatch({
                type: SORT_BY_PACKAGE,
                payload: { direction: direction }
            })
    }
}

export default connect(null, mapDispatchToProps)(Headers)
