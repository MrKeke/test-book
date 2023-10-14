import {Items} from "./components/Items";
import {Pagination} from "./components/Pagination";
import {Header} from "./components/Header";


function App() {

    return (
        <>
            <Header/>
            <Items/>
            <Pagination/>
        </>
    );
}

export default App;
/*
            <div className='flex m-10 justify-center items-center'>
                <input onChange={(e)=>setValue(e.target.value)} value={value}  className=' p-2 rounded m-1 border-solid border-2 border-black'/>
                <button onClick={()=> dispatch(getBooks(value))} className=' text-white bg-blue-800 rounded p-2 border-solid border-black border-2' >Send</button>
                <div>{total}</div>

            </div>
            <div className='grid grid-cols-4'>
                {items.length !== 0 && items.map((e)=><Item id={e.id} title={e.volumeInfo.title} imgSrc={e.volumeInfo?.imageLinks?.thumbnail} category={e.volumeInfo?.categories} author={e.volumeInfo.authors}/>)}
                <button className='border-black border-solid border-2 rounded-3xl h-10 center' onClick={()=> dispatch(paginationBook({query:value,showed}))}> Load More...</button>
                {loading && 'Загрузка'}

            </div>
            <div>
                <Input></Input>
            </div>
 */
