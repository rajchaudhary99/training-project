import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const useFetchcountry = (country) => {
  const [covidData, setCovidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);

        
        if (response.data) {
          setCovidData(response.data);
        } else {
          setError('Country not found');
        }
        setLoading(false); 
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [country]); 

  return { covidData, loading, error };
};

export default useFetchcountry;
