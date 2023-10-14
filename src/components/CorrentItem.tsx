import {useEffect, useState} from "react";
import {useAppDispatch} from "../store/hooks";
import {setOpen} from "../store/Slicers/fetchbooks";


interface ICorrentItem {
    id:string
}

export const CorrentItem:React.FC<ICorrentItem> =  ({id}) =>{
    const [item, setItem] = useState({img:'',authors:'',category:'',description:'',title:''})
    useEffect( () => {
        async function fetchbook (id:string) {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            const data = await response.json()
            setItem( {...item,
                img:data.volumeInfo?.imageLinks?.thumbnail,
                authors: data.volumeInfo?.authors?.join(', ') || 'Автор неуказан',
                category: data.volumeInfo?.categories?.join('/') || 'Категории неуказаны',
                title: data.volumeInfo?.title,
                description: data.volumeInfo?.description
            })
        }
        fetchbook(id)

    }, []);
    const dispatch = useAppDispatch()

    return(
        <>
            <div onClick={() => dispatch(setOpen({ id: id, opened: false }))} className='absolute right-0 font-bold text-4xl p-7 cursor-pointer'>X</div>
            <div className='flex flex-col p-4 sm:flex-row'>
                <div className='bg-gray-200 sm:w-1/2'>
                    <img className='w-full h-full p-20' src={item.img} />
                </div>
                <div className='flex flex-col p-6 sm:w-1/2'>
                    <div className='text-gray-400 pb-3 sm:pb-10'>{item.category}</div>
                    <div className='font-bold pb-3 sm:pb-5'>{item.title}</div>
                    <div className='text-gray-400 pb-3 sm:pb-10 underline'>{item.authors}</div>
                    <div className='border-solid border-2 border-black p-3 text-sm'>{item.description}</div>
                </div>
            </div>
        </>
    )
}
