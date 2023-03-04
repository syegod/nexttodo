import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export default function Register() {
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const submitHandler = async () => {
        if (!form.email && !form.password) {
            setError('Enter email and password.')
            return setTimeout(() => setError(''), 4000)
        }
        if (!form.email || form.email.length < 5) {
            setError('Invalid email.')
            return setTimeout(() => setError(''), 4000)
        }
        if (form.password.length < 6) {
            setError('Password length requires 6 symbols.')
            return setTimeout(() => setError(''), 4000)
        }
        try {
            await signup(form.email, form.password)
            console.log(currentUser);
        } catch (e) {
            setError('Something goes wrong.')
        }
    }
    const inputHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="flex flex-col gap-y-10 justify-center items-center flex-1 relative">
            <h1 className="text-4xl">REGISTER</h1>
            <hr className="bg-white w-1/3" />
            {error && <div className="text-red-400 border p-3 border-red-400">{error}</div>}
            <div className="w-1/3 flex flex-col items-center gap-y-5 relative text-2xl text-slate-900">
                <input onChange={e => inputHandler(e)} type="email" name="email" className="w-full outline-none p-2 max-w-[30ch] min-w-[20ch]" placeholder="Enter email" />
                <input onChange={e => inputHandler(e)} type="password" name="password" className="w-full outline-none p-2 max-w-[30ch] min-w-[20ch]" placeholder="Enter password" minLength={6} />
                <button onClick={submitHandler} className="text-white w-full min-w-[20ch] uppercase py-1 max-w-[30ch] border border-white duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"><h1 className="relative z-20">SUBMIT</h1></button>
            </div>
        </div>

    )
}