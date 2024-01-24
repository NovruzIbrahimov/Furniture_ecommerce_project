import furnitureData from "../data/MockData";

function getFurnitures() {
  return Promise.resolve(furnitureData);
}

function getFurnituresById(id) {
  return Promise.resolve(furnitureData.find((furniture) => furniture.id === parseInt(id)));
}

export { getFurnitures, getFurnituresById };