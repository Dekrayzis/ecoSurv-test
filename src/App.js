import React, { useEffect, useState } from "react";
import { BreedImage, Button, DropDown } from "./components";
import usePopulateBreeds from "./hooks/usePopulateBreeds";
import {
  getSubBreeds,
  getBreedImages,
  getSubBreedImages,
} from "./helpers/index";

const App = () => {
  //-- Error handling
  const [errors, setErrors] = useState({ breed: false });

  //-- Breed types
  const { allBreeds, setAllBreeds } = usePopulateBreeds();
  const [allSubBreeds, setAllSubBreeds] = useState([]);
  const [dogImages, setDogImages] = useState([]);
  const [currentCount, setCurrentCount] = useState(0);

  //-- Filter parameters
  const [filterParams, setFilterParams] = useState({
    breed: "",
    subBreed: "",
    count: 1,
  });

  //-- Fetch breeds on mount.
  useEffect(() => {
    setAllBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandle_BreedChange = async (value) => {
    setErrors({ ...errors, breed: value === "" ? true : false });

    if (value !== "") {

      const subBreeds = await getSubBreeds(value);

      setAllSubBreeds(subBreeds);
      setFilterParams({
        ...filterParams,
        breed: value,
        subBreed: subBreeds.length > 0 ? subBreeds[0] : "",
      });

    } else {
      setFilterParams({...filterParams, breed: "", subBreed: "" });
      setDogImages([]);
    }
  };

  const onHandle_Change = (type, value) => {
    setFilterParams({ ...filterParams, [type]: value });
  };

  const renderDogImages = () =>
    dogImages
      .slice(0, currentCount)
      .map((imgURL, idx) => (
        <BreedImage
          key={imgURL + idx}
          imgUrl={imgURL}
          label={`breed-img-${idx}`}
        />
      ));

  const validateForm = () => (filterParams.breed.length > 0 ? true : false);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const { breed, subBreed, count } = filterParams;

    //-- validate filter
    if (validateForm()) {
      setDogImages(
        breed !== "" && subBreed !== ""
          ? await getSubBreedImages(breed, subBreed, count)
          : await getBreedImages(breed, count)
      );
      setCurrentCount(count);
    } else {
      //-- Update error state
      setErrors({ breed: breed === "" ? true : false });
    }
  };

  return allBreeds && allBreeds.length > 0 ? (
    <div className="App">
      <header className="app__header">
        <div className="container">
          <div className="row">
            <form onSubmit={(e) => onSubmit(e)}>
              <DropDown
                name="breed"
                label="Breed"
                blankFirstOption
                onChange={(val) => onHandle_BreedChange(val)}
                options={allBreeds}
                error={errors.breed}
              />

              {allSubBreeds.length > 0 && (
                <DropDown
                  name="subBreed"
                  label="Sub-breed"
                  onChange={(val) => onHandle_Change("subBreed", val)}
                  options={allSubBreeds}
                />
              )}

              <DropDown
                name="count"
                label="Number of images"
                onChange={(val) => onHandle_Change("count", val)}
                options={Array(10)
                  .fill(0)
                  .map((_, i) => i + 1)}
              />
              <Button label="View images" />
            </form>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">
          <div className="images-container">
            {dogImages && renderDogImages(dogImages)}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default App;
