export const addTodo = (name:any,title:any,discription:any) =>{
  return {
    type: 'ADD_TODO',
    payload:{
      id: new Date().getTime(),
      name: name,
      title: title,
      discription:discription,
      status: "PENDING"
    }
  }
}

export const deleteTodo = (id:number) => {
  return {
    type: 'DELETE_TODO',
    payload:id
  }
}

export const updateStatus = (id: number) => {
  return {
    type: 'UPDATE_STATUS',
    payload: id
  };
};

export const editTodo = (id: number, updatedData: { name: string, title: string, discription: string }) => {  
  return {
    type: 'EDIT_TODO',
    payload: {
      id : id,
      updatedData : updatedData
    }
  }
}
