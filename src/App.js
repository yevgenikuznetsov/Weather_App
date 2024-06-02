import { useRoutes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/main/Main';
import Favorites from './components/favorites/Favorites';

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
