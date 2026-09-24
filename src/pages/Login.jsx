import {useState} from 'react'

import { loginUser } from '../services/authAPI'

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('')
        setIsLoading(true)

        try {
            const data = await loginUser(username, password)


            console.log(data)
        } catch(error) {
            setError("Invalid username or password")
        } finally {
            setIsLoading(false)
        }
        
    }

    return(
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className='w-md max-w-wd'>
                <div className= "bg-white rounded-2xl shadow-lg p-8">
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-gray-900'>Admin Form</h1>
                        <p className='mt-2 text-sm text-gray-500'>
                            Sign in to manage your products
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <label htmlFor="email" 
                                   className='block text-sm font-medium text-gray-700 mb-2'
                            >
                                Email
                            </label>
                            <input type='text' 
                                   value={username} 
                                   onChange={(e)=> setUsername(e.target.value)} 
                                   placeholder="Enter your username"
                                   className='w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                                   required
                            />
                        </div>

                        <div>
                            <label htmlFor='password'
                                   className='block text-sm font-medium text-gray-700 mb-2'
                            >
                                Password
                            </label>
                            <input type='password' 
                                   value={password} 
                                   onChange={(e)=> setPassword(e.target.value)} 
                                   className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                   placeholder='Enter your password'
                                   required
                            />
                        </div>

                        {error && (
                            <div className='rounded-lg bg-red-50 border border-red-200 px-4 py-y'>
                                <p className='text-sm text-red-600'>{error}</p>
                            </div>
                        )}
            
                        <button 
                        disabled = {isLoading}
                        className='w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
                        >
                            {isLoading ? "Loggin In..." : "Login"}
                        </button>

                    </form>

                </div>
            </div>
        </div>
        
        
        </>
    )
}

export default LoginPage