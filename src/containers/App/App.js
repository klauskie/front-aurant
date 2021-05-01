import './App.css';
import Routes from '../../components/Routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
