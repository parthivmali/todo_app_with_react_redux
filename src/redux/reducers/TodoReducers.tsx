// alwase data stored to the local Storage so used this code.
const getLocalData = localStorage.getItem('todo');
const initialState = {
    tasks: getLocalData ? JSON.parse(getLocalData) : []
};

const todoReducer  = (state=initialState,action:any):any => {
    switch(action.type) {
        case 'ADD_TODO':
            // eslint-disable-next-line no-case-declarations
            const value = [...state.tasks, action.payload]
            localStorage.setItem('todo', JSON.stringify(value));
            return {
                ...state,
                tasks: value
            };
        case 'DELETE_TODO':
            // eslint-disable-next-line no-case-declarations
            const updatedData = state.tasks.filter((task: any) => task.id !== action.payload);
            localStorage.setItem('todo', JSON.stringify(updatedData));

            return {
                ...state,
                tasks: updatedData
                
            };
        case 'UPDATE_STATUS':
            // eslint-disable-next-line no-case-declarations
            const updateStatus = state.tasks.map((task: any) => task.id === action.payload ? {...task, status: "COMPLETE"} : task)
            localStorage.setItem('todo', JSON.stringify(updateStatus));
            return {
                ...state,
                tasks: updateStatus
            }
        case 'EDIT_TODO':
            // eslint-disable-next-line no-case-declarations
            const editData = [...state.tasks]
            // eslint-disable-next-line no-case-declarations
            const index = editData.findIndex((item:any)=> item.id === action.payload.id);
            editData[index] = {...editData[index],...action.payload.updatedData}
            localStorage.setItem('todo', JSON.stringify(editData));
            return {
                ...state,
                tasks: editData
            }
        default:
            return state;
    }
 }

 export default todoReducer ;