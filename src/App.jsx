import { useEffect, useState } from 'react'
import './App.css'
import Velha from './Velha'

function App() {
  const [jogadorDaVez, setJogadorDaVez] = useState('X')
  const [tabuleiroDaVez, setTabuleiroDaVez] = useState(4)
  const [tabuleiros, setTabuleiros] = useState([
    '', '', '',
    '', '', '',
    '', '', ''
  ])

  useEffect(() => {
    if (tabuleiros[tabuleiroDaVez] != '') //tabuleiro finalizado
      setTabuleiroDaVez(-1)
  }, [tabuleiroDaVez])

  return (
    <>
      <h1>Multi Velha</h1>
      <div className='card'>
        {
          tabuleiros.map((jogada, index) => {
            return (
              <Velha
                key={index.toString()}
                jogadorDaVez={jogadorDaVez}
                setJogadorDaVez={setJogadorDaVez}
                setTabuleiroDaVez={setTabuleiroDaVez}
                fimDeJogo={(jogador) => {
                  tabuleiros[index] = jogador
                  setTabuleiros([...tabuleiros])
                }}
                overlay={tabuleiroDaVez > -1 && tabuleiroDaVez != index}
              />
            )
          })
        }
      </div>
    </>
  )
}

export default App
