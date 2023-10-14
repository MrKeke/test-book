import {setOpen} from "../store/Slicers/fetchbooks";
import {useAppDispatch} from "../store/hooks";

interface IItem {
    id:string
    title?:string
    imgSrc: string
    category?:string[]
    author?: string[]
}
export const Item:React.FC<IItem> = ({ id,title = 'Название отсутвует',imgSrc,category,author}) =>{

    const dispatch = useAppDispatch()
    const clickHandler = () => {
        dispatch(setOpen({id:id,opened:true}))
        console.log('work')
    }
    return(
        <div onClick={clickHandler} key={id} className=' cursor-pointer m-5 p-3 bg-gray-200 border-solid border-2 border-gray-300 sm:m-10 sm:p-4 sm:rounded-3xl'>
            <img className=' shadow-black shadow-lg mb-2 sm:mb-4' src={imgSrc} alt='Картинка отсутствует' />
            {category && <div className='underline'>{category.join(', ')}</div>}
            <div className='font-bold text-sm sm:text-base'>{title}</div>
            {author && <div className='opacity-50 text-sm sm:text-base'>{author.join(', ')}</div>}
        </div>



    )
}
