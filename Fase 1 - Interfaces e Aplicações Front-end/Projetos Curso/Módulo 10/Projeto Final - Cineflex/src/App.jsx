import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Home from './pages/Home';
import Sessoes from './pages/Sessoes';
import Assentos from './pages/Assentos';
import Sucesso from './pages/Sucesso';

function App() {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sessoes/:idFilme" element={<Sessoes />} />
                    <Route path="/assentos/:idSessao" element={<Assentos />} />
                    <Route path="/sucesso" element={<Sucesso />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
