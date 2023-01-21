import {useState, useCallback}from 'react'

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
  
    const sendRequest = useCallback(async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
        //   'https://react-http-6b4a6.firebaseio.com/tasks.json'
        requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
        console.log(data);
        applyData(data);
       
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },[]);
    return {
        // isLoading: isLoading,
        // error:error,
        // sendRequest:sendRequest
        // same as 

        isLoading,
        error,
        sendRequest

    }
}

export default useHttp
