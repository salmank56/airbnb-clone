"use client";

import { safaUser, safeListings } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { categoriesList } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
  reservations?: Reservation[];
  listing: safeListings & {
    user: safaUser;
  };
  currentUser?: safaUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categoriesList.find((item) => {
      return item.label === listing.category;
    });
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValues}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={listing.category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValues}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
