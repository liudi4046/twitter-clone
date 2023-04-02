import React, { useState, useEffect, useCallback } from "react"
import axios, { AxiosResponse, AxiosError } from "axios"
import { PostPreviews } from "../types"

interface State<T> {
  data: T
  isLoading: boolean
  error: AxiosError
}

export default function useQuery<T>(
  url: string,
  method: "GET" | "POST",
  config?: { onSuccess?: (data: T) => void },
  data?: unknown
): State<T> {
  const [dataState, setDataState] = useState<T>(null as unknown as T)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<AxiosError>(null as unknown as AxiosError)

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
      config?.onSuccess?.(response.data)
      setDataState(response.data)

      setIsLoading(false)
      setError(null as unknown as AxiosError)
    } catch (err) {
      setDataState(null as unknown as T)
      setError(err as AxiosError)
      setIsLoading(false)
    }
  }, [url, method, data])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return { data: dataState, isLoading, error }
}
