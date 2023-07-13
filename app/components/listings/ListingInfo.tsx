"use client";

import useCountries from "@/app/hooks/useCountries";
import { safaUser } from "@/app/types";
import { IconBaseProps } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user: safaUser | null;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconBaseProps;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div
      className="
  col-span-4 flex flex-col gap-8
  "
    >
      <div className="flex justify-between flex-col gap-2 ">
        <div className="text-xl font-semibold flex flex-grow items-center gap-10">
          <div>Entire property is hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
    </div>
  );
};

export default ListingInfo;
