import React, { useState, useEffect, useCallback } from "react"
import axios, { AxiosResponse } from "axios"

interface State<T> {
  data: T
  isLoading: boolean
  error: Error
}
export default function useQuery<T>(
  url: string,
  method: "GET" | "POST",
  data?: unknown
): State<T> {
  const [dataState, setDataState] = useState<T>(null as unknown as T)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>(null as unknown as Error)

  const fetchData = useCallback(async () => {
    console.log("fetching...")
    try {
      const response: AxiosResponse<T> = await axios({
        url,
        method,
        headers: {
          "app-id": "642566ec75ad9137e92e3351",
        },
        data,
      })
      setDataState(response.data)
      setIsLoading(false)
    } catch (err) {
      setError(err as Error)
      setIsLoading(false)
    }
  }, [url, method, data])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return { data: dataState, isLoading, error }
}
