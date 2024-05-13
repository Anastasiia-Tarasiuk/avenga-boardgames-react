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
import Stats from '../../pages/Stats';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App(): JSX.Element {
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<MyList />} />
        <Route path="add_game" element={<SearchGame />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="players" element={<Players />} />
        <Route path="settings" element={<Settings />} />
        <Route path="game/:gameId" element={<Game/>}/>
        <Route path="score/:gameId" element={<Score/>}/>
        <Route path="player/:playerId" element={<Stats/>}/>
        <Route path='*' element={<NotFound/>} />
      </Route>
    </Routes>
  </>
);
}

export default App;
