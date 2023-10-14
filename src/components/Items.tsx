import {useAppSelector} from "../store/hooks";
import {Item} from "./Item";
import {IItem} from "../Interface/Interfaces";
import {CorrentItem} from "./CorrentItem";


export const Items: React.FC = () => {

    const {items, loading, category, sortBy,currentId,opened} = useAppSelector(state => state.books)

    const sortByCallBack = (a: IItem, b: IItem) => {
        if (sortBy === 'relevance') {
            return 0
        }else{
            // @ts-ignore
            return new Date(b.volumeInfo.publishedDate) - new Date(a.volumeInfo.publishedDate);
        }
    }
    const categoryFilterCallBack = (e: IItem) => {

        if (category.toLowerCase() === 'all') {
            return true
        }else if(sortBy === 'newest'){
           return  e.volumeInfo?.categories?.includes(category) && e.volumeInfo?.publishedDate
        }else {
            return e.volumeInfo?.categories?.includes(category)
        }
    }
    const mapCallBack = (e: IItem) => {

        return (
            <>
                 <Item id={e.id} title={e.volumeInfo?.title}
                        imgSrc={e.volumeInfo?.imageLinks?.thumbnail}
                        category={e.volumeInfo?.categories}
                        author={e.volumeInfo.authors}/>

            </>

        )
    }

    return (
        <>
            {!opened && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {items.length !== 0 && items.filter(categoryFilterCallBack).sort(sortByCallBack).map(mapCallBack)}
                    <div className='flex justify-center items-center'>
                        {loading && (
                            <span className='w-8 h-8 border-2 border-solid border-black animate-spin border-b-white rounded-full'></span>
                        )}
                    </div>
                </div>
            )}
            {opened && <CorrentItem id={currentId} />}


        </>

    )
}
