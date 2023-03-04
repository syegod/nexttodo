import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import {doc, setDoc, deleteField} from 'firebase/firestore'
import { db } from '@/firebase';
import useFetchTodos from '@/hooks/fetchTodos';
import ToDoCard from '@/components/ToDoCard';

const Dashboard = () => {
    const { currentUser, userInfo } = useAuth()
    if (!currentUser) document.location = '/auth/login'

    const [todo, setTodo] = useState('')
    const [addTodo, setAddTodo] = useState(false)
    const {todos, setTodos, loading, error} = useFetchTodos()

    
    async function handleAddTodo() {
        if (!todo) { return }
        const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
        setTodos({ ...todos, [newKey]: todo })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: todo
            }
        }, { merge: true })
        setTodo('')
    }

    async function handleEditTodo() {
        if (!edittedValue) { return }
        const newKey = edit
        setTodos({ ...todos, [newKey]: edittedValue })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: edittedValue
            }
        }, { merge: true })
        setEdit(null)
        setEdittedValue('')
    }

    function handleAddEdit(todoKey) {
        return () => {
            console.log(todos[todoKey])
            console.log('bannan')
            setEdit(todoKey)
            setEdittedValue(todos[todoKey])
        }
    }

    function handleDelete(todoKey) {
        return async () => {
            const tempObj = { ...todos }
            delete tempObj[todoKey]

            setTodos(tempObj)
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(userRef, {
                'todos': {
                    [todoKey]: deleteField()
                }
            }, { merge: true })

        }
    }

    return (
        <div className='flex-1 flex flex-col items-center gap-y-7'>
            <div className='w-full flex gap-y-7 flex-col items-center'>
                {addTodo && (
                    <div className='flex-1 flex w-full justify-center'>
                        <input value={todo} type="text" name="todo" className='text-2xl py-3 px-2 text-slate-900 sm:w-full max-w-[35ch] outline-none focus:border-b-2 border-teal-400' onChange={e => setTodo(e.target.value)} />
                        <button onClick={() => handleAddTodo()} className='bg-teal-400 px-3 hover:opacity-70 duration-300'>ADD</button>
                    </div>
                )}
                {!addTodo &&
                    <button onClick={() => setAddTodo(true)} className='text-3xl border-2 sm:w-full max-w-[30ch] px-14 py-2 text-teal-400 border-teal-400 hover:opacity-50 duration-300'>ADD TODO</button>
                }
            </div>
            {(userInfo && loading) && (
                <div className='absolute top-1/3 z-50'>
                    <i className='fa-solid fa-spinner animate-spin text-6xl'></i>
                </div>
            )}
            {(userInfo && !loading) &&
                <div className='flex-1 flex w-full flex-col items-center gap-y-3'>
                    {Object.keys(todos).map((todo, i) => {
                        return (
                            <ToDoCard key={i} todoKey={todo} handleDelete={handleDelete}>{todos[todo]}</ToDoCard>
                        )
                    })}
                </div>
            }
        </div>
    );
}

export default Dashboard;
