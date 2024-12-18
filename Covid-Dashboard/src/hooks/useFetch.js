import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (api) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchData = async ()=>{
    setLoading(true);
    try {
      const response = await axios.get(api);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error 404");
      setLoading(false);
    }
   };
   fetchData();
  }, [api]);

  return { data, error, loading };
};

export default useFetch;
