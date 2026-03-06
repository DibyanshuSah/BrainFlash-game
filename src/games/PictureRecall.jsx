import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/game.css";

function PictureRecall() {

const navigate = useNavigate();
const inputRefs = useRef([]);

const [grid,setGrid] = useState(null);
const [numbers,setNumbers] = useState([]);
const [inputs,setInputs] = useState([]);
const [showNumbers,setShowNumbers] = useState(true);
const [level,setLevel] = useState(1);

const [bestScore,setBestScore] = useState(
Number(localStorage.getItem("recall_best")) || 0
);

const [gameOver,setGameOver] = useState(false);



function generateNumbers(count){
let arr=[];
for(let i=0;i<count;i++){
arr.push(Math.floor(Math.random()*9)+1);
}
return arr;
}



useEffect(()=>{

if(!grid || gameOver) return;

const total = grid.rows * grid.cols;

const nums = generateNumbers(total);

setNumbers(nums);
setInputs(Array(total).fill(""));
setShowNumbers(true);

const timer = setTimeout(()=>{
setShowNumbers(false);
},2000);

return ()=>clearTimeout(timer);

},[grid,level,gameOver]);



function handleChange(value,index){

if(!/^[0-9]?$/.test(value)) return;

let newInputs=[...inputs];
newInputs[index]=value;

setInputs(newInputs);


/* move to next box */

if(value!=="" && index<inputs.length-1){
inputRefs.current[index+1].focus();
}

}



/* backspace move */

function handleKeyDown(e,index){

if(e.key==="Backspace" && inputs[index]==="" && index>0){
inputRefs.current[index-1].focus();
}

}



function handleSubmit(){

if(inputs.join("") === numbers.join("")){

setLevel(prev=>prev+1);

}else{

if(level>bestScore){
localStorage.setItem("recall_best",level);
setBestScore(level);
}

setGameOver(true);

}

}



function tryAgain(){

setLevel(1);
setGameOver(false);

}



/* GRID SELECT SCREEN */

if(!grid){

return(

<div className="game-page">

<h1 className="game-title">Picture Recall</h1>

<p className="best-score">
Best Score: <span>{bestScore}</span>
</p>

<div className="game-card">

<h2>Select Grid</h2>

<div className="grid-select">

<button className="game-btn" onClick={()=>setGrid({rows:2,cols:2})}>
2 × 2
</button>

<button className="game-btn" onClick={()=>setGrid({rows:2,cols:3})}>
2 × 3
</button>

<button className="game-btn" onClick={()=>setGrid({rows:3,cols:2})}>
3 × 2
</button>

<button className="game-btn" onClick={()=>setGrid({rows:3,cols:3})}>
3 × 3
</button>

</div>

</div>

</div>

)

}



return(

<div className="game-page">

<h1 className="game-title">Picture Recall</h1>

<p className="best-score">
Best Score: <span>{bestScore}</span>
</p>


<div className="game-card">

{!gameOver ? (

<>

<h2>Level {level}</h2>

<div
className="grid"
style={{
gridTemplateColumns:`repeat(${grid.cols},60px)`
}}
>

{showNumbers ?

numbers.map((num,i)=>(
<div key={i} className="cell">{num}</div>
))

:

inputs.map((val,i)=>(

<input
key={i}
className="cell-input"
value={val}
maxLength={1}
ref={(el)=>inputRefs.current[i]=el}
onChange={(e)=>handleChange(e.target.value,i)}
onKeyDown={(e)=>handleKeyDown(e,i)}
inputMode="numeric"
/>

))

}

</div>

{!showNumbers && (

<button className="submit-btn" onClick={handleSubmit}>
Submit
</button>

)}

</>

):(


<div style={{textAlign:"center"}}>

<h2>❌ Wrong!</h2>

<div className="game-buttons">

<button className="game-btn" onClick={tryAgain}>
Try Again
</button>

<button className="game-btn" onClick={()=>navigate("/")}>
Back
</button>

</div>

</div>

)}

</div>

</div>

)

}

export default PictureRecall;