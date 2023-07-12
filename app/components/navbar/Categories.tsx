"use client";

import Container from "../Container";

import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categoriesList = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This Property is close to the beach",
  },
  {
    label: "Windmills",
    icon: MdOutlineVilla,
    description: "This Property has windmills",
  },
  {
    label: "Modern",
    icon: GiWindmill,
    description: "This Property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This Country side",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This Property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This Property is on an Island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This Property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This Property has Skiing Activites",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This Property is a Castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This Property has Camping Activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This Property has Camping Activities",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This Property is a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This Property is in the desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This Property is in the barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This Property is luxourious",
  },
];

const Categories = () => {
  const params = useSearchParams();
  console.log(params?.get("category"));
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto scrollbar">
        {categoriesList.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
