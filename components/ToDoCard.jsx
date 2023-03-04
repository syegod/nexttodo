import React, {useState} from 'react';

const ToDoCard = (props) => {
    const { children, todoKey, handleDelete } = props
    const [isEdit, setIsEdit] = useState(false)
    return (
        <div className='border-2 sm:w-full max-w-[58ch] flex justify-between items-center p-2 gap-x-3'>
            <span className='pr-1 break-all flex-1'>
                 {!isEdit ? <>{children}</> : ( 
                     <input type="text" value={children} className='bg-white w-full text-slate-900 px-2 outline-none'/>
                )}
            </span>
            <div className='flex gap-x-3'>
                {isEdit ? <i onClick={() => setIsEdit(false)} class="fa-solid fa-check hover:opacity-70 duration-200 outline-none cursor-pointer"></i> :
                <i onClick={() => setIsEdit(true)} class={`fa-solid fa-pen hover:opacity-70 duration-200 outline-none cursor-pointer`}></i>}
                <i onClick={handleDelete(todoKey)} class="fa-solid fa-trash hover:opacity-70 duration-200 outline-none hover:scale-125 cursor-pointer"></i>
            </div>
        </div>
    );
}

export default ToDoCard;
