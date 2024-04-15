import { Route, Routes } from 'react-router-dom';
import './App.css';
import SharedLayout from '../SharedLayout';
import MyList from '../../pages/MyList';
import SearchGame from '../../pages/SearchGame';
import Favourites from '../../pages/Favourites';
import Players from '../../pages/Players';
import Settings from '../../pages/Settings';
import NotFound from '../NotFound';
import Game from '../../pages/Game';
import Score from '../../pages/Score';

function App() {

return (
  <Routes>
    <Route path="/" element={<SharedLayout />}>
      <Route index element={<MyList />} />
      <Route path="add_game" element={<SearchGame />} />
      <Route path="favourites" element={<Favourites />} />
      <Route path="players" element={<Players />} />
      <Route path="settings" element={<Settings />} />
      <Route path="game/:gameId" element={<Game/>}/>
      <Route path="score/:gameId" element={<Score/>}/>
      <Route path='*' element={<NotFound/>} />
    </Route>
</Routes>
);
}

export default App;
