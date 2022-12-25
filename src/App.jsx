import React from 'react'
import Die from "./die"

export default function App(){

  const [counter, setCounter] = React.useState(0)
  
  const [dices,setDices] = React.useState(newDices())

  const [tenzies, setTenzies] =React.useState(false)

  React.useEffect(() => {
    const allDices = dices.every(die => die.on)
    const firstVal = dices[0].value;
    const allVal = dices.every(die => die.value == firstVal)
    if(allDices && allVal)
      setTenzies(true)
  }, [dices])

  function newDices(){
    let array = []
    for(let i=0;i<10;i++)
      array.push(
        Values(i)
      )
      return array;
  }

  function Values(poz){
    return {
      value: Math.floor(Math.random()*6)+1,
      on: false,
      id: poz
    }
  }

  function NewGame(){
    setTenzies(false)
    setDices(newDices())
    setCounter(0)
  }

  function Change(){
    setCounter(val => val+1)
    setDices(vals => vals.map(die => {
      return !die.on ? Values(die.id) : die
    }))
  }

  function Hold(id){
    setDices(vals => vals.map(die => {
      return die.id==id ? {...die, on: !die.on} : die
    }))
  }

  const dicesHtml = dices.map(dice => 
        <Die 
          key={dice.id} 
          value={dice.value}
          on={dice.on} 
          Hold={() => Hold(dice.id)}
        />)

  return (
    <div className='container'>
      <h1>Tenzies</h1>
      <h3>Roll until all dice are the same. 
        Click each die to freeze it at its current value 
        between rolls.</h3>
      <div className='game'>
          {dicesHtml}
      </div>
      <button onClick={tenzies ? NewGame : Change}>{tenzies ? "New Game" : "Roll"}</button>
      <h1>Nr of rolls: {counter}</h1>
    </div>
  )
}
