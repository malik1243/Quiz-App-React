import React, { useRef, useState } from 'react'
import "./Quiz.css"
import { data } from '../assets/Data';


const Quiz = () => {
    let [index,setIndex] = useState(0);
    let [Question,setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false);
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let opt=[option1,option2,option3,option4]

    const checkAns = (e,ans) => {
        if(lock === false){
            if(index===data.length-1){
                setResult(true);
                return 0;
                }
            if(Question.ans===ans){
            e.target.classList.add("correct");
            setLock(true);
            setScore(prev=>prev+1)
        }else{
            e.target.classList.add("wrong");
            setLock(true);
            opt[Question.ans-1].current.classList.add("correct")
        }
        }
        
    }

    const next = ()=>{
        if(lock===true){
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            opt.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = ()=>{
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {result?<>
        </>:<> <h2>{index+1}. {Question.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{Question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{Question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{Question.option3}</li>
            <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{Question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index+1} out of {data.length}</div></>}
       
       {result?<><h2>You Scored {score} out of {data.length}</h2>
       <button onClick={reset}>Reset</button></>:<></>}
       
    </div>
    
  )
}

export default Quiz