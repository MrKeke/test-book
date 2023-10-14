import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IItem, Root} from "../../Interface/Interfaces";


interface IItinitalState {
    items: IItem[]
    total: number
    query: string
    showed: number
    category: string
    sortBy: string
    loading: boolean
    error: null | string
    opened: boolean
    currentId:string
}


const initialState: IItinitalState = {
    items: [],
    query: '',
    category: 'all',
    sortBy: 'relevance',
    total: 0,
    showed: 0,
    loading: false,
    error: null,
    opened:false,
    currentId:'',


}

function getUrl(array: [string, string][]): URL {

    const token: string = 'AIzaSyBtd8Q2bHN_-g6HQgVAcerOaShYRA8ZgFw'
    const url = new URL('/books/v1/volumes', 'https://www.googleapis.com')
    url.searchParams.set('key', token)
    url.searchParams.set('maxResults', '30')
    array.forEach(([key, value]) => {
        url.searchParams.set(key, value)
    })
    return url
}

export const getBooks = createAsyncThunk<Root, string, { rejectValue: string }>(
    'books/getBooks', async function (query, {rejectWithValue}) {

        const url = getUrl([['q', query]])

        const response = await fetch(url)

        if (!response.ok) {
            return rejectWithValue('Can\'t add task. Server error.');
        }
        return await response.json()
    }
)

interface IPagination {
    query: string
    showed: number
}

export const paginationBook = createAsyncThunk<Root, IPagination, { rejectValue: string }>(
    'books/paginationBook', async function (options, {rejectWithValue}) {

        const url = getUrl([['q', options.query], ['startIndex', options.showed.toString()]])

        const response = await fetch(url)
        if (!response.ok) {
            return rejectWithValue('Can\'t add task. Server error.');
        }
        return await response.json()
    }
)

const bookSlicer = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload
        },
        setCategory(state, action) {
            state.category = action.payload
        },
        setSort(state, action) {
            state.sortBy = action.payload
        },
        setOpen(state,action){
            state.opened = action.payload.opened
            state.currentId = action.payload.id
            console.log(state.opened)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.items = action.payload.items
                state.total = action.payload.totalItems
                state.showed = 30
                state.loading = false
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.error = action.payload
                }
            })
            .addCase(paginationBook.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(paginationBook.fulfilled, (state, action) => {
                if (action.payload.items) {
                    state.items = [...state.items, ...action.payload.items]
                    state.showed = state.showed + action.payload.items.length
                }
                state.error = null
                state.loading = false


            })
            .addCase(paginationBook.rejected, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.error = action.payload
                }
            })
    },
});
export const {setQuery, setSort,setOpen,setCategory} = bookSlicer.actions
export default bookSlicer.reducer;

