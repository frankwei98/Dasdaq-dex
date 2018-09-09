import { withLogger } from 'undux'

let effects = store => {
    withLogger(store)
    return store
}

export default effects