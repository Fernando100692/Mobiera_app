export const sortByDate = (list, key, mode = 'desc') =>
  list.sort((a, b) => {
    const result =
      mode === 'desc'
        ? new Date(b[key]) - new Date(a[key])
        : new Date(a[key]) - new Date(b[key]);
    return result;
  });

export const onAddFavorites = (itm, currentFavorites, setMyFavorites) => {
  const favoritesArray = [...currentFavorites, {...itm}];
  setMyFavorites(favoritesArray);
};

export const onDeleteFavorites = (itm, currentFavorites, setMyFavorites) => {
  const filteredArray = currentFavorites.filter(elem => elem.id !== itm?.id);
  const favoritesArray = [...filteredArray];
  setMyFavorites(favoritesArray);
};

export const onPressValidateFav = (itm, myFavorites, setFavorites) => {
  const currentFavorites = myFavorites ? myFavorites : [];
  if (currentFavorites?.some(elem => elem.id === itm?.id)) {
    onDeleteFavorites(itm, currentFavorites, setFavorites);
  } else {
    onAddFavorites(itm, currentFavorites, setFavorites);
  }
};

export const onCheckFav = (itm, myFavorites) => {
  return myFavorites ? myFavorites?.some(elem => elem.id === itm?.id) : false;
};
