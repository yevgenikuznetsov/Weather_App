import { useRoutes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Favorites from './components/Favorites';
import Header from './components/Header';

const App = () => {
  const routes = useRoutes([
    { path: '/', element: <Main /> },
    { path: 'favorites', element: <Favorites /> }
  ]);

  return (
    <>
      <Header />
      {routes}
    </>
  );
};

export default App;
