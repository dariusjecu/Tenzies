import React from 'react';

export default function Die(props){
    const style = {
        backgroundColor: props.on ? "#59E391" : "white"
    }
    return (
        <div className='box' style={style} onClick={props.Hold}>
            <h1>{props.value}</h1>
        </div>
    )
}