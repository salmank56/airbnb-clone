import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favouriteIds = [...(currentUser.favouriteIds || [])];

  favouriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favouriteIds
    }
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favouriteIds = [...(currentUser.favouriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favouriteIds
    }
  });

  return NextResponse.json(user);
}




// or better

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//   listingId?: string;
// }

// export async function POST(
//   request: Request,
//   { params }: { params: IParams }
// ) {
//   const currentUser = await getCurrentUser();
//   if (!currentUser) {
//     return new Response("Unauthorized", { status: 401 }); // Return 401 Unauthorized status
//   }

//   const { listingId } = params;

//   if (!listingId || typeof listingId !== "string") {
//     throw new Error("Invalid Id"); // Throw an error if the listingId is missing or not a string
//   }

//   let favouriteIds = [...(currentUser.favouriteIds || [])];

//   favouriteIds.push(listingId); // Add the listingId to the favouriteIds array

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id,
//     },
//     data: {
//       favouriteIds,
//     },
//   });

//   return new Response(JSON.stringify(user), {
//     headers: { "Content-Type": "application/json" },
//   }); // Return the updated user as a JSON response
// }

// export async function DELETE(request: Request, { params }: { params: IParams }) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return new Response("Unauthorized", { status: 401 }); // Return 401 Unauthorized status
//   }

//   const { listingId } = params;
//   if (!listingId || typeof listingId !== "string") {
//     throw new Error("Invalid Id"); // Throw an error if the listingId is missing or not a string
//   }

//   let favouriteIds = [...(currentUser.favouriteIds || [])];

//   favouriteIds = favouriteIds.filter((id) => id !== listingId); // Filter out the listingId from the favouriteIds array

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id,
//     },
//     data: {
//       favouriteIds,
//     },
//   });

//   return new Response(JSON.stringify(user), {
//     headers: { "Content-Type": "application/json" },
//   }); // Return the updated user as a JSON response
// }
