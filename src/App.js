import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import PuzzlePage from './pages/PuzzlePage'
import Header from './components/Header/Header'

function App() {
  //It would be more correct to read these numbers in from the API, but it would also double the number of database
  //queries, which would cost me more money. 
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
    endgames_engine:304628
  }
  let rootTarget = ""
  //If the user has never used our app before, we want to load two ultra-simple puzzles to teach the controls. 
  if(!localStorage.getItem("visited")){
    rootTarget =  `introduction/easy/1`
  }else{
    //Otherwise, send him to the last puzzle he was on before. 
    rootTarget = localStorage.getItem('visited').split(',')[0]
  }
  return (
    <>
      <BrowserRouter>
      <Header ranges = {ranges}/>
      <Routes>
      <Route path = "/" element ={<Navigate to={rootTarget}/>}/>
      <Route path=":category/:difficulty/:id" element={<PuzzlePage ranges={ranges}/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
