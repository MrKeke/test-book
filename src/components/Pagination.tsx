import {useAppDispatch, useAppSelector} from "../store/hooks";
import {paginationBook} from "../store/Slicers/fetchbooks";
import {useEffect, useState} from "react";

export const Pagination: React.FC = () => {
    const [show, setShow] = useState(false)

    const dispatch = useAppDispatch()
    const {query, showed, total,opened} = useAppSelector(state => state.books)

    useEffect(() => {
        showed > 0 ? setShow(true) : setShow(false)
        showed >= total && setShow(false)
        opened && setShow(false)
    }, [showed, total,opened]);
    const clickHandler = () => {
        dispatch(paginationBook({query, showed}))
    }

    return (
        <>
            {show && <>
                <hr/>
                <button className=' items-center w-full m-10' onClick={clickHandler}>Загрузить ещё</button>
            </>}

        </>
    )
}
