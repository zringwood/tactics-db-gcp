import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import PuzzlePage from './pages/PuzzlePage'
import Header from './components/Header/Header'
function App() {
  const ranges = {
    middlegames_easy:42417,
    middlegames_medium:265410,
    middlegames_hard:537875,
    middlegames_grandmaster:412692,
    middlegames_engine:382651,
    endgames_easy:38448,
    endgames_medium:421053,
    endgames_hard:380018,
    endgames_grandmaster:373110,
    endgames_engine:304628,
    totalGames: 3366499,
  }
  return (
    <>
      <BrowserRouter>
      <Header ranges = {ranges}/>
      <Routes>
      <Route path = "/" element ={<Navigate to={`/middlegames/easy/${Math.ceil(Math.random() * ranges.middlegames_easy)}`}/>}/>
      <Route path = "/middlegames/">
        <Route path=":difficulty/:id" element={<PuzzlePage category={"middlegames"} ranges={ranges} />}/>
      </Route>
      <Route path = "/endgames/" >
        <Route path=":difficulty/:id" element={<PuzzlePage category={"endgames"} ranges={ranges}/>}/>
      </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
