import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

interface IProps {
    order: 'asc' | 'desc'
    orderBy: string
    onRequestSort: (property: string) => void
}

interface IState {}

export class HeaderTableTests extends React.Component<IProps, IState> {
    public render(): JSX.Element {
        const { order, orderBy, onRequestSort } = this.props
        const headCells = [
            {
                label: '',
                width: '10%'
            },
            {
                label: 'name',
                width: '50%'
            },
            {
                label: 'package',
                width: '20%'
            },
            {
                label: 'actions',
                width: '20%'
            }
        ]
        return (
            <TableHead>
                <TableRow>
                    {headCells.map(headCell => (
                        <TableCell
                            key={headCell.label}
                            sortDirection={orderBy === headCell.label ? order : false}>
                            <TableSortLabel
                                active={orderBy === headCell.label}
                                direction={orderBy === headCell.label ? order : 'asc'}
                                onClick={() => onRequestSort(headCell.label)}>
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }
}