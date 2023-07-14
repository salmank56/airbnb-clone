"use client";

import { BiGlobe } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { safaUser } from "@/app/types";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const notify = () => toast.error("You must logged in first");

interface UserMenuProps {
  currentUser: safaUser | null | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      notify();
      <Toaster />;
      return loginModal.onOpen();
    }
    // otherwise open rent modal
    rentModal.onOpen();
  }, [loginModal, currentUser, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <div
          onClick={onRent}
          className="hidden sm:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer whitespace-nowrap"
        >
          Airbnb your home
        </div>
        <div
          onClick={() => {}}
          className="hidden sm:block font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-xl"
        >
          <BiGlobe height={28} />
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {/* Toggle Menu */}
      {isOpen && (
        <div className="absolute rounded-xl shadow-lg w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 border-[1px] border-gray-300 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onclick={() => router.push("/trips")}
                  label="My Trips"
                />
                <MenuItem
                  onclick={() => router.push("/favourites")}
                  label="My Favourites"
                />
                <MenuItem
                  onclick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onclick={() => {
                    router.push("/properties");
                    toggleOpen();
                  }}
                  label="My properties"
                />
                <MenuItem
                  onclick={() => {
                    toggleOpen();
                    rentModal.onOpen();
                  }}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem onclick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onclick={() => {
                    toggleOpen();
                    loginModal.onOpen();
                  }}
                  label="Login"
                />
                <MenuItem
                  onclick={() => {
                    toggleOpen();
                    registerModal.onOpen();
                  }}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
