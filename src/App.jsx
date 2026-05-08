import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import FilmDetail from './pages/FilmDetail'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/films/:slug" element={<FilmDetail />} />
      </Route>
    </Routes>
  )
}

export default App
