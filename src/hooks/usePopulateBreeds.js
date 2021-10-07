/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { breedsAPIUrl, allBreedsKey } from "../constants";

const usePopulateBreeds = () => {
  const apiKey_all = breedsAPIUrl + allBreedsKey;
  const [allBreeds, setAllBreeds] = useState({});

  useEffect(() => {
    const fetchBreedsData = async (endpoint) => {
      try {
        const result = await (await fetch(endpoint)).json();
        setAllBreeds(Object.keys(result.message));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBreedsData(apiKey_all);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { allBreeds, setAllBreeds };
};

export default usePopulateBreeds;
