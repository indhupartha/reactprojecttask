export const punkReducer = ( state = {initialData: []}, action) => {
    switch (action.type) {
        case "FETCH_API_DATA":
            
            return {
                ...state,
                initialData: action.data
            } 
    
        default:
            return state;
    }
}