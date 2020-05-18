import { useState, useEffect } from 'react';

export default function useFetch(url, options) {
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setData(result.results);
          console.log('Good response');
        },
        (error) => {
          setIsLoading(false);
          setData(null);
          setError(error);
          console.log('Bad response: ' + error);
        }
    );
  }, [url, options]);

  return [isloading, data, error];
}