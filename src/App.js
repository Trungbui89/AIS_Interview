import './App.css';
import { BrowserRouter } from 'react-router-dom';
import React  from 'react';
import Main from './components/MainComponent';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </div>
    );
}

export default App;
