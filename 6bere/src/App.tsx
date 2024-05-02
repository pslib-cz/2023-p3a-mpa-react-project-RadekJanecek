import './App.css'
import Game from './components/Game.tsx'
import Menu from './components/Menu.tsx'
import Rules from './components/Rules.tsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<Menu />} />,
      <Route path="/game" element={<Game />} />,
      <Route path="/rules" element={<Rules />} />
    ]),
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
