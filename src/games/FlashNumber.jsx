import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/game.css";

function FlashNumber() {

const navigate = useNavigate();

const [number,setNumber] = useState("");
const [input,setInput] = useState("");
const [showNumber,setShowNumber] = useState(false);
const [level,setLevel] = useState(1);
const [gameOver,setGameOver] = useState(false);

const [countdown,setCountdown] = useState(null);
const [started,setStarted] = useState(false);

const [bestScore,setBestScore] = useState(
Number(localStorage.getItem("flash_best")) || 0
);


/* generate random number */

function generateNumber(digits){

let num="";

for(let i=0;i<digits;i++){
num+=Math.floor(Math.random()*10);
}

return num;

}


/* start game */

function startGame(){

setStarted(true);
setCountdown(3);

}


/* countdown */

useEffect(()=>{

if(countdown === null) return;

if(countdown === 0){

setCountdown(null);
setShowNumber(true);

return;

}

const timer = setTimeout(()=>{
setCountdown(prev => prev - 1);
},1000);

return ()=>clearTimeout(timer);

},[countdown]);


/* level logic */

useEffect(()=>{

if(!showNumber || gameOver) return;

const digits = Math.min(level + 2 , 7);

const newNumber = generateNumber(digits);

setNumber(newNumber);
setInput("");

const timer = setTimeout(()=>{
setShowNumber(false);
},2000);

return ()=>clearTimeout(timer);

},[level,showNumber,gameOver]);


/* submit */

function handleSubmit(){

if(input === number){

setLevel(prev=>prev+1);
setShowNumber(true);

}else{

if(level > bestScore){

localStorage.setItem("flash_best",level);
setBestScore(level);

}

setGameOver(true);

}

}


/* restart */

function tryAgain(){

setLevel(1);
setGameOver(false);
setStarted(false);

}


return(

<div className="game-page">

<h1 className="game-title">Flash Number</h1>

<p className="best-score">
Best Score: <span>{bestScore}</span>
</p>

<div className="game-card">

{/* START SCREEN */}

{!started && !gameOver && (

<button
className="submit-btn"
onClick={startGame}
>
Start Game
</button>

)}

{/* COUNTDOWN */}

{countdown !== null && (

<h2 style={{fontSize:"48px"}}>
{countdown}
</h2>

)}

{/* GAME */}

{started && !gameOver && countdown === null && (

<>

<h2>Level {level}</h2>

{showNumber ? (

<div className="flash-number">
{number}
</div>

) : (

<div className="input-area">

<input
type="tel"
inputMode="numeric"
pattern="[0-9]*"
maxLength="7"
placeholder="Type the number"
value={input}
onChange={(e)=>setInput(e.target.value.replace(/\D/g,""))}
onKeyDown={(e)=>e.key==="Enter" && handleSubmit()}
/>

<button
className="submit-btn"
onClick={handleSubmit}
>
Submit
</button>

</div>

)}

</>

)}

{/* GAME OVER */}

{gameOver && (

<div>

<h2>❌ Wrong!</h2>

<p style={{marginTop:"10px"}}>
Correct Number: <b>{number}</b>
</p>

<p style={{marginTop:"10px"}}>
Your Score: <b>{level}</b>
</p>

<div className="game-buttons">

<button
className="game-btn"
onClick={tryAgain}
>
Try Again
</button>

<button
className="game-btn"
onClick={()=>navigate("/")}
>
Back
</button>

</div>

</div>

)}

</div>

</div>

)

}

export default FlashNumber;