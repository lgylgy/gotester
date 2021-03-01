import React from 'react'
import SearchBar from 'material-ui-search-bar'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { FILTER_BY_NAME } from '../store/actionTypes'
import { ITestsState } from '../type'

interface IState {}
interface IProps {
    state: ITestsState
    filter: (text: string) => void
}

class SearchField extends React.Component<IProps, IState> {
    public state: IState = {}

    private onTextChange = (text: string): void => {
        this.props.filter(text)
    }

    public render(): JSX.Element {
        return <SearchBar value={this.props.state.filtered} onChange={this.onTextChange} />
    }
}

const mapStateToProps = (state: ITestsState) => {
    return { state }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        filter: (text: string) =>
            dispatch({
                type: FILTER_BY_NAME,
                payload: { text: text }
            })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchField)
