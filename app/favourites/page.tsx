import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavouriteListings";
import FavoritesClient from "./FavouriteClient";

const FavouritePage = async () => {
  const currentUser = await getCurrentUser();
  const favouriteListings = await getFavoriteListings();

  console.log(favouriteListings);
  if (favouriteListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found"
          subtitle="looks like you have no favourite properties "
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={favouriteListings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavouritePage;
