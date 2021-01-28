import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { TableTestsStore } from './components/Table'
import SearchField from './components/SearchBar'

import './App.css'

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <Container fixed>
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc' }}>
                        <SearchField />
                        <TableTestsStore />
                    </Typography>
                </Container>
            </header>
        </div>
    )
}

export default App
