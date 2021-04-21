import logo from './logo.svg';
import './App.css';
import Routes from '../../components/Routes/Routes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
