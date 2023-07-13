import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {toast} from 'react-hot-toast'

import { safaUser } from "../types";


import useLoginModal from "./useLoginModal"

interface IUseFavourites {
    listingId: string
    currentUser?: safaUser | null

}

const useFavourites =  ({
    listingId,
    currentUser
}: IUseFavourites) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavourited = useMemo(()=> {
        const list = currentUser?.favouriteIds || [];


        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();


        if(!currentUser){
            return loginModal.onOpen()
        }

        console.log(listingId)
        try {
            let request
            if(hasFavourited){
                request = () =>  axios.delete(`/api/favourites/${listingId}`)
            }  else {
                request = () => axios.post(`/api/favourites/${listingId}`)
            }

            await request();
            router.refresh()
            toast.success("Success")

        } catch (error) {
            toast.error('something went wrong')
        }

    }, [currentUser, hasFavourited, listingId, loginModal, router])


    return {
        hasFavourited,
        toggleFavourite
    }
}

export default useFavourites;