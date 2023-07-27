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
        <Route path = "easy" element={<Navigate to={`/middlegames/easy/${Math.ceil(Math.random() * ranges.middlegames_easy)}`}/>}/>
        <Route path = "medium" element={<Navigate to={`/middlegames/medium/${Math.ceil(Math.random() * ranges.middlegames_medium)}`}/>}/>
        <Route path = "hard" element={<Navigate to={`/middlegames/hard/${Math.ceil(Math.random() * ranges.middlegames_hard)}`}/>}/>
        <Route path = "grandmaster" element={<Navigate to={`/middlegames/grandmaster/${Math.ceil(Math.random() * ranges.middlegames_grandmaster)}`}/>}/>
        <Route path = "engine" element={<Navigate to={`/middlegames/engine/${Math.ceil(Math.random() * ranges.middlegames_engine)}`}/>}/>
      </Route>
      <Route path = "/endgames/" >
        <Route path = "easy" element={<Navigate to={`/endgames/easy/${Math.ceil(Math.random() * ranges.endgames_easy)}`}/>}/>
        <Route path = "medium" element={<Navigate to={`/endgames/medium/${Math.ceil(Math.random() * ranges.endgames_medium)}`}/>}/>
        <Route path = "hard" element={<Navigate to={`/endgames/hard/${Math.ceil(Math.random() * ranges.endgames_hard)}`}/>}/>
        <Route path = "grandmaster" element={<Navigate to={`/endgames/grandmaster/${Math.ceil(Math.random() * ranges.endgames_grandmaster)}`}/>}/>
        <Route path = "engine" element={<Navigate to={`/endgames/engine/${Math.ceil(Math.random() * ranges.endgames_engine)}`}/>}/>
      </Route>
        <Route path="/middlegames/:difficulty/:id" element={<PuzzlePage category={"middlegames"} />}/>
        <Route path="/endgames/:difficulty/:id" element={<PuzzlePage category={"endgames"} />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
