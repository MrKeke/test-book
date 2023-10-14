import React, {useState} from "react";
import {useAppDispatch} from "../store/hooks";
import {getBooks, setQuery} from "../store/Slicers/fetchbooks";


export const Input:React.FC = () =>{

    const [inputValue, setInputValue] = useState('')
    const dispatch = useAppDispatch()

    const fetchBookHandler = () => {
        dispatch(getBooks(inputValue))
        dispatch(setQuery(inputValue))
    };
    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        e.charCode === 13 &&
        fetchBookHandler()
    }
    return(
        <>
            <div className='text-center '>
                <input onKeyPress={keyPressHandler} autoFocus className=' p-2 w-1/4 h-10 outline-none'  onChange={(e)=>setInputValue(e.target.value)} value={inputValue} placeholder='Ключевое слово'  />
                <button className=' text-2xl h-10 ' onClick={fetchBookHandler}>🔍</button>

            </div>
        </>

    )
}
