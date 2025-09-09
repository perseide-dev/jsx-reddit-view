import { getRedditThreadsService } from "@/services/reddit.services"
import { useState } from "react"

export  const useReddit = () => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const getPosts = async(queryData) => {
        try{
            setLoading(true)
            const response = await getRedditThreadsService(token, queryData)
            setResponse(response.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }



    return{
        response,
        error,
        loading,
        getPosts
    }
}