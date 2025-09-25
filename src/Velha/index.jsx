import { useEffect, useState } from 'react'
import './index.css'

const Overlay = ({ children }) => {
    return (
        <div className='block'>{children}</div>
    )
}

export default ({ jogadorDaVez, setJogadorDaVez, setTabuleiroDaVez, overlay, fimDeJogo }) => {
    const [ganhador, setGanhador] = useState([]);
    const [gameover, setGameover] = useState(false);
    const [jogadas, setJogadas] = useState([
        '', '', '',
        '', '', '',
        '', '', ''
    ])

    useEffect(() => {
        if (gameover)
            fimDeJogo(jogadas[ganhador[0]])
    }, [gameover])

    useEffect(() => {
        verificaJogadas()
    }, [jogadas])

    const verificaJogadas = () => {
        if (
            verificaGanhador(0, 1, 2) || //linha1
            verificaGanhador(3, 4, 5) || //linha2
            verificaGanhador(6, 7, 8) || //linha3

            verificaGanhador(0, 3, 6) || //coluna1
            verificaGanhador(1, 4, 7) || //coluna2
            verificaGanhador(2, 5, 8) || //coluna3

            verificaGanhador(0, 4, 8) || //diagonal1
            verificaGanhador(2, 4, 6)    //diagonal2
        ) {
            setGameover(true);
        }

        const totalDeJogadas = jogadas.filter(x => x != '').length;
        if (totalDeJogadas == 9)  //Deu velha !!`
            setGameover(true);
    }

    const verificaGanhador = (i1, i2, i3) => {
        const ganhou = (
            jogadas[i1] != '' && jogadas[i2] != '' && jogadas[i3] != '' &&
            jogadas[i1] == jogadas[i2] && jogadas[i1] == jogadas[i3]
        );

        if (ganhou)
            setGanhador([i1, i2, i3]);

        return ganhou
    }

    const fazJogada = (posicao) => {
        if (!gameover && !overlay) {
            jogadas[posicao] = jogadorDaVez
            setJogadas([...jogadas])
            setTabuleiroDaVez(posicao)
            setJogadorDaVez(jogadorDaVez == 'X' ? 'O' : 'X')
        }
    }

    return (
        <>
            <div className="card">
                {
                    jogadas.map((jogada, index) => {
                        let classes = "botao "
                        if (jogada == '')
                            classes += "empty "
                        else if (jogada == 'X')
                            classes += "playerX "
                        else if (jogada == 'O')
                            classes += "playerO "
                        if (gameover && ganhador.includes(index))
                            classes += 'win'
                        return (
                            <button key={index.toString()} className={classes} onClick={() => fazJogada(index)}>
                                {jogada}
                            </button>
                        )
                    })
                }
                {
                    overlay && <div className='block'>
                        <label>{gameover ? jogadas[ganhador[0]] : ""}</label>
                    </div>
                }
            </div>
        </>
    )
}
