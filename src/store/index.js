import { createConnectedStore } from 'undux'
import effects from './effects'
import ScatterJS from 'scatter-js/dist/scatter.esm';


const initialState = {
    lang: 'zh-CN',
    theme: 'light',
    scatter: ScatterJS
}
// Create a store with an initial value.
export default createConnectedStore(initialState, effects)
