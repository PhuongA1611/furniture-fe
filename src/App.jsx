import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import './assets/fontawewsome/css/all.min.css';
import RouteConfig from './config/RouteConfig';


function App() {
  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  );
}

export default App;
