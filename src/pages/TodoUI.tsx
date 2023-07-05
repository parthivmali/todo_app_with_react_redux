import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../redux/action";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../hooks/Toaster";


const TodoUI = () => {
  const {id} =  useParams()
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [names, setNames] = useState<string>("");
  const [titles, setTitles] = useState<string>("");
  const [discription, setDiscription] = useState<string>("");
  const tasks = useSelector((state: any) => state.tasks);

  const [namesError, setNamesError] = useState<string>("");
  const [titlesError, setTitlesError] = useState<string>("");
  const [discriptionError, setDiscriptionError] = useState<string>("");
    
    
  const handleAddNamesOrEditNames = () => {
    setNamesError("");
    setTitlesError("");
    setDiscriptionError("");

    if(!names){
        setNamesError("Names is required");
    }
    if(!titles){
        setTitlesError("Title is required");
    }
    if(!discription){
        setDiscriptionError("Discription is required");
    }


    if(names && titles && discription.length !== 0) {
        if(id){
            Toast.fire({
                icon: 'success',
                title: 'Update in successfully'
              })
            dispatch(editTodo(Number(id),{ name:names,title:titles,discription:discription}));
        }else{
            Toast.fire({
                icon: 'success',
                title: 'Add Todo in successfully'
              })
            dispatch(addTodo(names, titles, discription )); 
        }
        navigate('/')
    }
  };

  useEffect(() => {
    if(id){
        const todo = tasks.find((item:any)=> item.id === Number(id))        
        if(todo){
            setNames(todo.name);
            setTitles(todo.title);
            setDiscription(todo.discription);
        }
    }
  },[id, tasks])
  
  useEffect(() => {
    const editedTodoData = tasks.find((task:any)=> task.id === Number(id))
    if(editedTodoData) {
        const UpdateTodoData = tasks.map((item:any)=> (item.id === editedTodoData.id ? editedTodoData : item))
        localStorage.setItem('todo', JSON.stringify(UpdateTodoData))
        
    }
  },[tasks,id])

  const handleGoBack = () => {
    navigate('/');
  }
  return (
    <>
        {/* Todo Input Fields */}
        <div className="flex flex-1 flex-col w-96 mx-auto mt-32 px-6 py-12 lg:px-8 border shadow-lg">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className={`text-center text-2xl font-bold leading-9 tracking-tight ${id ? 'text-orange-600': 'text-indigo-600'}  uppercase underline underline-offset-2`}>
                    {id ? 'Update Todo List':'Welcome To Todo List'}
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" method="POST">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        value={names}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNames(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {namesError && <p className="mt-1 text-xs text-red-500">{namesError}</p>}
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        id="title"
                        name="title"
                        type="title"
                        autoComplete="title"
                        value={titles}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitles(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {titlesError && <p className="mt-1 text-xs text-red-500">{titlesError}</p>}
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="disc" className="block text-sm font-medium leading-6 text-gray-900">
                        Discription
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        id="disc"
                        name="disc"
                        type="disc"
                        autoComplete="disc"
                        value={discription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscription(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {discriptionError && <p className="mt-1 text-xs text-red-500">{discriptionError}</p>}
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        onClick={handleAddNamesOrEditNames}
                        className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 ${id ? 'bg-orange-400  text-white shadow-sm hover:bg-orange-600': 'bg-indigo-600  text-white shadow-sm hover:bg-indigo-700'} `}
                    >
                        {id ? 'Update Todo Data': 'Add Todo Data'}
                    </button>
                    </div>
                    <div>
                        <p onClick={handleGoBack} className="text-red-600 font-semibold text-sm text-center cursor-pointer">Go back to dashborad</p>
                    </div>
                </form>
                </div>
        </div>
    </>
  );
};

export default TodoUI;

