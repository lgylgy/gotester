import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { TableTests } from './components/TableTests'

import './App.css'

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <Container fixed>
                    <Typography
                        component="div"
                        style={{ backgroundColor: '#cfe8fc' }}>
                        <TableTests />
                    </Typography>
                </Container>
            </header>
        </div>
    )
}

export default App
