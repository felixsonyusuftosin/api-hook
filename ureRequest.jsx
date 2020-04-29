import { useState, useEffect, useRef } from 'react'
import { apiError, axiosInstance } from './utils'

// appState.signInUserSession.idToken.jwtToken,
export const axiosConfigurations = {
  method: 'get',
  responseType: 'json',
  responseEncoding: 'utf8',
  validateStatus: status => status < 400 || status === 404
}

export const useRequest = (rest = {}) => {
  const firstUpdate = useRef(true)
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const makeRequest = async () => {
      setLoading(true)
      try {
        const { data, status } = await axiosInstance({ ...axiosConfigurations, url, ...rest })
        if (data) {
          setLoading(false)
        }

        if (status === 404) {
          // we assume all 404 requests returns null so we will pass null
          // users should set a default value to avoid accessing null values
          setData(null)
          return
        }
        // TODO should possibly update this part to accommodate for other none json response types
        setData(data)
        setUrl('')
        return
      } catch (error) {
        setUrl('')
        setLoading(false)
        if (error.response) {
          const { data, status } = error.response
          setError({ info: apiError({ status, url }), statusText: '', serverInfo: data })
        } else if (error.request) {
          setError({ info: 'Something Happened', statusText: '', serverInfo: error.request })
        } else {
          setError({ info: 'Something Happened', statusText: '', serverInfo: error.message })
        }

        // this is probably a js error so its best to show the users a customized error message
      }
    }
    if (!firstUpdate.current && url) {
      makeRequest()
    }
    firstUpdate.current = false
    // eslint-disable-next-line
  }, [url])

  return { data, loading, error, callApi: setUrl }
}
