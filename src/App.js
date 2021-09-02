import './App.scss';
import Main from './components/Main';
import  TicketContextProvider  from './TicketContext';



function App() {
  return (
    <div className="App">
      <TicketContextProvider>
        <Main />
      </TicketContextProvider>
    </div>
  );
}

export default App;
