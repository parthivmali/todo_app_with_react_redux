import { MdDeleteForever } from 'react-icons/md';
import { LuEdit } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, editTodo, updateStatus } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';


const TodoTable = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tasks = useSelector((state: any) => state.tasks);
    const [viewMode,setViewMode] = useState('grid')    
    const getLocalData :any = localStorage.getItem('todo');
    const finalData=  JSON.parse(getLocalData);
    
    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
                dispatch(deleteTodo(id));
            }
        })
    };

    const handleEdit = (data: any) => {       
        dispatch(editTodo(data.id,data));       
        navigate(`/create-todo/${data.id}`);
    }
    
    const handleChecked = (id: number) => {
        dispatch(updateStatus(id));
    };

    const handleClick = () => {
        navigate('/create-todo')
    };

    const getBackgroundColor = (status: string) => {
        if (status === "PENDING") {
          return "no-underline";
        }else{
            return "line-through";
        }
    };

    const handleClickGridView = () => {
        setViewMode('grid');
    };

    const handleClickStickyNoteView = () => {
        setViewMode('sticky');
    }

      
      
  return (
    <div>
        <div className='text-end mt-3 overflow-hidden sm:block flex justify-between'>
            <button className={`bg-yellow-500 text-blue-900 ${viewMode === 'grid' ? 'active' : ''} hover:bg-yellow-700 hover:text-slate-50 font-semibold p-1 sm:px-4 sm:mx-2 mx-1`} onClick={handleClickGridView}>Grid View 📙</button>
            <button className={`bg-yellow-500 text-blue-900 ${viewMode === 'sticky' ? 'active' : ''} hover:bg-yellow-700 hover:text-slate-50 font-semibold p-1 sm:px-2 sm:mx-2 mx-1`} onClick={handleClickStickyNoteView}>Sticky Note View 📚</button>
        </div>
        <div className='mx-2 mt-3'><button onClick={handleClick} className='bg-blue-900 hover:bg-blue-950 text-white font-bold w-full p-2 text-xl'>Add Todo 📝 </button></div>
        {/* User Data Grid View Table */}
        {viewMode === 'grid' 
        ? 
            <> 
                {finalData?.length !== 0 ? 
                    <div className="overflow-x-scroll  m-2">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border border-black">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-black">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-black">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-black">
                                        Discription
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-black">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-black">
                                        created Date & Time
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-black">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {finalData?.map((item: any, index: number) => {
                                const backgroundColor = getBackgroundColor(item.status);
                                return (
                                    <tr key={index} className="bg-gray-200 border-b">
                                        <td scope="row" className="px-6 py-2 text-black border border-black text-md font-bold">
                                            {index + 1}
                                        </td>
                                        <td className={`px-6 py-2 text-black border border-black xl:text-lg font-bold ${backgroundColor}`}>
                                            {item.name}
                                        </td>
                                        <td className={`px-6 py-2 text-black border border-black xl:text-lg font-bold ${backgroundColor}`}>
                                            {item.title}
                                        </td>
                                        <td className={`px-6 py-2 text-black border border-black xl:text-lg font-bold ${backgroundColor}`}>
                                            {item.discription}
                                        </td>
                                        <td className={`px-6 py-2 text-black border border-black xl:text-lg font-bold`}>
                                            <button className="xl:text-xl text-black p-2 px-3">{item.status}</button>
                                        </td>
                                        <td className={`px-6 py-2 text-black border border-black xl:text-lg font-bold`}>
                                            <button className="lg:text-xl text-black p-2 px-3">
                                            {moment().format('MMMM D, YYYY h:mm A')}
                                            </button>
                                        </td>
                                        <td className="px-6 py-2 text-black border border-black xl:text-lg font-bold">
                                            <div className="flex justify-around">
                                                <button className="xl:text-4xl lg:text-2xl text-red-700" onClick={() => handleDelete(item.id)}>
                                                    <MdDeleteForever />
                                                </button>
                                                <button className="xl:text-3xl lg:text-xl text-blue-700" onClick={() => handleEdit(item)}>
                                                    <LuEdit />
                                                </button>
                                                <input type="checkbox" name="checked" id="checked" className="xl:w-5 lg:w-4 cursor-pointer" onClick={() => handleChecked(item.id)}/>
                                            </div>
                                        </td>
                                    </tr>
                                );
                                })}
                            </tbody>
                        </table>
                    </div>
                :   
                    <div className="text-center mt-32 font-bold text-lg uppercase underline underline-offset-2 ">
                        <p>Todo data is empty...!!</p>
                    </div>
                }
            </>
            
        :
            <>
                {/* User Data Sticky Note View Table */}
                {finalData?.length !== 0 
                ?
                    <table className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  text-sm text-left text-gray-500 mt-3">
                    {finalData?.map((item: any, index: number) => {
                        const backgroundColor = getBackgroundColor(item.status);
                    return(
                        <div key={index} className='flex justify-center my-5'>
                            <div className='border border-black'>
                                <tr className='px-6 py-2 text-black text-md font-bold'>
                                    <td className='border border-black px-6 py-2'>Id</td>
                                    <td className='border border-black px-6 py-2'>{index + 1}</td>
                                </tr>
                                <tr className='px-6 py-2 text-black text-md font-bold'>
                                    <td className='border border-black px-6 py-2'>Name</td>
                                    <td className={`border border-black px-6 py-2 ${backgroundColor}`}>{item.name}</td>
                                </tr>
                                <tr className='px-6 py-2 text-black text-md font-bold'>
                                    <td className='border border-black px-6 py-2'>Title</td>  
                                    <td className={`border border-black px-6 py-2 ${backgroundColor}`}>{item.title}</td>
                                </tr>
                                <tr className='px-6 py-2 text-black text-md font-bold'>
                                    <td className='border border-black px-6 py-2'>Discription</td>  
                                    <td className={`border border-black px-6 py-2 ${backgroundColor}`}>{item.discription}</td>
                                </tr>
                                <tr className='px-6 py-2 text-black text-md font-bold'>
                                    <td className='border border-black px-6 py-2'>Status</td>  
                                    <td className='border border-black px-6 py-2'>{item.status}</td>
                                </tr>
                                <tr className='px-6 py-2 text-black text-md font-bold'>
                                    <td className='border border-black px-6 py-2'>Action</td>  
                                    <td className='border border-black px-6 py-2'>
                                        <div className="flex justify-around">
                                            <button className="text-lg text-red-700" onClick={() => handleDelete(item.id)}>
                                                <MdDeleteForever />
                                            </button>
                                            <button className="text-md text-blue-700" onClick={() => handleEdit(item)}>
                                                <LuEdit />
                                            </button>
                                            <input type="checkbox" name="checked" id="checked" className="w-3 cursor-pointer" onClick={() => handleChecked(item.id)}/>
                                        </div>
                                    </td>
                                </tr>
                            </div>
                        </div>
                    ) 
                    })}
                    </table>
                : 
                    <div className="text-center mt-32 font-bold text-lg uppercase underline underline-offset-2 ">
                        <p>Todo data is empty...!!</p>
                    </div>
                }
            </>
        }

        

    </div>
  )
}

export default TodoTable