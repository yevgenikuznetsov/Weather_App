import { useRoutes } from 'react-router-dom';
import './App.css';
import Favorites from './components/Favorites';
import Header from './components/Header';
import Main from './components/main/Main';

const App = () => {
  const routes = useRoutes([
    { path: '/', element: <Main /> },
    { path: 'favorites', element: <Favorites /> }
  ]);

  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
};

export default App;
