import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase';
import { useAuth } from '@/context/AuthContext';

const useFetchTodos = () => {
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [todos, setTodos] = useState({})
    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setTodos(docSnap.data().todos)
                }
            } catch (e) {
                setError('Failed to load todos.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return { loading, error, todos, setTodos }
}

export default useFetchTodos;
