import React, { useState, useEffect, FC } from 'react';
import Head from 'next/head'
import styles from './index.module.scss'

const App: FC = () => {

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [input, setInput] = useState("")
  const [timer, setTimer] = useState(0);
  const [timerState, setTimerState] = useState(false);
  const [gameState, setGameState] = useState(false); // true == finished
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    if(timerState){
      // Timer started
      setTimeout(() => {
        setTimer(timer+1);
      }, 1)
    }
  }, [timerState, timer]);

  const Game = () => {

    const submit = (e: any) => {
      e.preventDefault();
      setTimerState(false);
      setTimer(0);
      setResults([]);
      setGameState(false);
      setInput("");
    }

    const onChange = (e: any) => {
      const split = e.target.value.split('');

      if(!gameState && !timerState && results.length == 0){
        setTimerState(true);
      }

      if(timerState){
        if(alphabet.split('')[alphabet.split('').length-1] == split[split.length - 1]){
          setTimerState(false);
          setGameState(true);
        }
      }

      if(alphabet.split('')[split.length-1] == split[split.length - 1]){
        if(timerState){
          if(!gameState){
            setInput(e.target.value);
            setResults((results) => [
              ...results,
              {key: split[split.length - 1], time: timer},
            ]);
          }
          
        }
      }
    }

    return (
      <div className={styles.game}>
        <h1>Type The Alphabet</h1>
        <h2>Typing game to see how fast you type. Timer starts when you do :)</h2>
        <div className={styles.status}>
          {alphabet.split('')[input.length] ? alphabet.split('')[input.length].toUpperCase() : "Success!"}
        </div>
        <form onSubmit={e => submit(e)}>
          <input type='text' autoFocus onChange={e => onChange(e)} value={input} placeholder="Type here. Pro tip: Press enter to restart" />
          <input type='submit' value='Reset'/>
        </form>
        <div className={styles.time}>
          Time: {timer/1000}s
        </div>
        {
          gameState && <div className={styles.results}>
            <p>Detailed Results 🏁</p>
            <ul>
              {results.map(element => {
                return <li><span className={styles.char}>{element.key}:</span> {element.time/1000}s</li>
              })}
            </ul>
          </div>
        }
        
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Type The Alphabet</title>
        <meta name="description" content="Type The Alphabet" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Lilita+One|Bangers&amp;display=swap" rel="stylesheet"></link>
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900' rel='stylesheet' type='text/css'></link>
      </Head>
      {Game()}
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div{
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default App
