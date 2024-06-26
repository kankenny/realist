// Packages
import { createContext, ReactNode } from "react"

// Hooks
import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"

// Components
import ListingSkeletons from "../../components/ui/ListingSkeletons"

// Types
import ListingType from "../types/ListingType"

type initialContextType = {
  allListings: ListingType[]
  trendingListings: ListingType[]
  sneakersListings: ListingType[]
  antiquesListings: ListingType[]
  techListings: ListingType[]
  accessoriesListings: ListingType[]
  collectiblesListings: ListingType[]
  expiredListings: ListingType[]
  unexpiredListings: ListingType[]
  isLoading: boolean
  refetchTimeline: () => void
}

// Initial Values
const initialContext = {
  allListings: [],
  trendingListings: [],
  sneakersListings: [],
  antiquesListings: [],
  techListings: [],
  accessoriesListings: [],
  collectiblesListings: [],
  expiredListings: [],
  unexpiredListings: [],
  isLoading: false,
  refetchTimeline: () => {},
}

const fetchListings = async () => {
  const DOMAIN = import.meta.env.VITE_DOMAIN

  const response = await fetch(`${DOMAIN}/api/listing/fetch`)
  const json = await response.json()

  if (!json.ok) {
    throw new Error(json.message)
  }

  return json
}

const TimelineContext = createContext<initialContextType>(initialContext)

const TimelineContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: allListingsData,
    isLoading,
    refetch: refetchTimeline,
  } = useQuery({
    queryKey: ["timelineListings"],
    queryFn: fetchListings,
    refetchInterval: 60_000, // refetch listings every minute
  })

  const { pathname } = useLocation()

  if (isLoading) {
    return pathname === "/" ? <ListingSkeletons /> : null
  }

  const allListings = allListingsData.data
  const sneakersListings = allListingsData.data.filter(
    (listing: ListingType) =>
      listing.category === "Sneakers" && new Date(listing.expireAt) > new Date()
  )
  const antiquesListings = allListingsData.data.filter(
    (listing: ListingType) =>
      listing.category === "Antiques" && new Date(listing.expireAt) > new Date()
  )
  const techListings = allListingsData.data.filter(
    (listing: ListingType) =>
      listing.category === "Tech" && new Date(listing.expireAt) > new Date()
  )
  const accessoriesListings = allListingsData.data.filter(
    (listing: ListingType) =>
      listing.category === "Accessories" &&
      new Date(listing.expireAt) > new Date()
  )
  const collectiblesListings = allListingsData.data.filter(
    (listing: ListingType) =>
      listing.category === "Collectibles" &&
      new Date(listing.expireAt) > new Date()
  )
  const expiredListings = allListingsData.data.filter(
    (listing: ListingType) => new Date(listing.expireAt) < new Date()
  )
  const unexpiredListings = allListingsData.data.filter(
    (listing: ListingType) => new Date(listing.expireAt) > new Date()
  )
  const trendingListings = allListingsData.data.filter(
    (listing: ListingType) =>
      new Date(listing.expireAt) > new Date() && listing.views > 0
  )

  const contextValue = {
    allListings,
    trendingListings,
    sneakersListings,
    antiquesListings,
    techListings,
    accessoriesListings,
    collectiblesListings,
    expiredListings,
    unexpiredListings,
    isLoading,
    refetchTimeline,
  }

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  )
}

export default TimelineContextProvider
export { TimelineContext }
