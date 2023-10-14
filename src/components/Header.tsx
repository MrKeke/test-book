import {Input} from "./Input";
import React, {useState} from "react";
import {Option, Selector} from "./Selector";
import {useAppDispatch} from "../store/hooks";
import {setCategory, setSort} from "../store/Slicers/fetchbooks";

export const Header: React.FC = () => {
    const [categorySelectorValue, setCategorySelectorValue] = useState('All')
    const [sortSelectorValue, setSortSelectorValue] = useState('relevance')
    const dispatch = useAppDispatch()
    const onChangeCategorySelector = (value:string)=> {
        setCategorySelectorValue(value)
        dispatch(setCategory(value))

    }
    const onChangeSortBySelector = (value:string)=>{
        setSortSelectorValue(value)
        dispatch(setSort(value))
    }
    const categoryOptions:Option[] = [{
        value: 'All',
        label: 'all'
    }, {
        value: 'Art',
        label: 'art'
    }, {
        value: 'Biography',
        label: 'biography'
    }, {
        value: 'Computers',
        label: 'computers'
    }, {
        value: 'History',
        label: 'history'
    }, {
        value: 'Medical',
        label: 'medical'
    }, {
        value: 'Poetry',
        label: 'poetry'
    },]
    const sortByOptions:Option[] = [{value:'relevance', label:'relevance'},{value:'newest',label:'newest'}]
    return (
        <div className='bg-gray-200'>
            <div className='text-center text-2xl mb-5'>Книжный поисковик</div>
            <Input />
            <div className='flex flex-col sm:flex-row justify-center items-center mt-5 pb-5'>
                <div className='mb-3 sm:mb-0 sm:mr-6'>
                    Категории:
                    <Selector options={categoryOptions} value={categorySelectorValue} onChange={onChangeCategorySelector} />
                </div>
                <div>
                    Сортировать по:
                    <Selector options={sortByOptions} value={sortSelectorValue} onChange={onChangeSortBySelector} />
                </div>
            </div>
        </div>

    )
}
