export const getSubBreeds = async (breedType) => {
  try {
    const result = await (
      await fetch(`https://dog.ceo/api/breed/${breedType}/list`)
    ).json();
    return Object.values(result.message);
  } catch (error) {
    console.error(error);
  }
};


export const getBreedImages = async (breedType, amount) => {
  try {
    const result = await (
      await fetch(`https://dog.ceo/api/breed/${breedType}/images/random/${amount}`)
    ).json();
    return Object.values(result.message);
  } catch (error) {
    console.error(error);
  }
};

export const getSubBreedImages = async (breedType, subBreedType, amount) => {
  try {
    const result = await (
      await fetch(`https://dog.ceo/api/breed/${breedType}/${subBreedType}/images/random/${amount}`)
    ).json();
    return Object.values(result.message);
  } catch (error) {
    console.error(error);
  }
};




