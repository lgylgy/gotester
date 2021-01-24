import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import './App.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Container fixed>
                    <Typography
                        component="div"
                        style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
                    />
                </Container>
            </header>
        </div>
    )
}

export default App
