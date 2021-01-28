import React from 'react'
import SearchBar from 'material-ui-search-bar'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { FILTER_BY_NAME } from '../store/actionTypes'

interface IState {
    text: string
}
interface IProps {
    filter: (text: string) => void
}

class SearchField extends React.Component<IProps, IState> {
    public state: IState = {
        text: ''
    }

    private onTextChange = (text: string): void => {
        this.setState({ text: text })
        this.props.filter(this.state.text)
    }

    public render(): JSX.Element {
        return <SearchBar value={this.state.text} onChange={this.onTextChange} />
    }
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

export default connect(null, mapDispatchToProps)(SearchField)
