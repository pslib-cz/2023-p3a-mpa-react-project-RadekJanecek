import './App.css'
import BotSelection from './components/BotSelection.tsx'
import Leaderboard from './components/Leaderboard.tsx'
import Game from './components/Game.tsx'
import Menu from './components/Menu.tsx'
import Rules from './components/Rules.tsx'
import { createRoutesFromElements, RouterProvider, Route, createBrowserRouter} from 'react-router-dom'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<Menu />} />,
      <Route path="/game" element={<Game />} />,
      <Route path="/rules" element={<Rules />} />,
      <Route path="/botselection" element={<BotSelection />} />,
      <Route path="/leaderboard" element={<Leaderboard />} />
    ]),
    {basename: '/2023-p3a-mpa-react-project-RadekJanecek'}
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
