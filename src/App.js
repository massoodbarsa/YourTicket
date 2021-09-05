import './App.scss';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import TicketContextProvider from './TicketContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cart from './pages/Cart';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TicketContextProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact> <Main /></Route>
            <Route path="/Cart"> <Cart /> </Route>
          </Switch>
        </TicketContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
