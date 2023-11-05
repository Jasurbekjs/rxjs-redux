import { Subject } from 'rxjs'
import { scan, startWith } from 'rxjs/operators'

const initialState = {
    counter: 0
}
const pre = document.querySelector('pre')

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const ADD       = 'ADD'
function reducer (state = initialState, action) {
    switch (action.type) {
        case INCREMENT: return {...state, counter: state.counter + 1 }
        case DECREMENT: return {...state, counter: state.counter - 1 }
        case ADD:       return {...state, counter: state.counter + action.payload }
        default: return state
    }
}

function createStore (rootReducer) {
    const subject$ = new Subject()
    
    const store$ = subject$.pipe(
        startWith({type: '__INIT__'}),
        scan(rootReducer, undefined)
    )

    store$.dispatch = action => subject$.next(action)

    return store$
}

const store$ = createStore(reducer)

store$.subscribe(state=>{
    pre.innerHTML = JSON.stringify(state, null, 2)
})

document.getElementById('increment').addEventListener('click', ()=>{
    store$.dispatch({type: INCREMENT})
})
document.getElementById('decrement').addEventListener('click', ()=>{
    store$.dispatch({type: DECREMENT})
})
document.getElementById('add').addEventListener('click', ()=>{
    store$.dispatch({type: ADD, payload: 10})
})