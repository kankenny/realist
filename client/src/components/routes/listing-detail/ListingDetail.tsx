import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import useAuth from "../../../lib/hooks/useAuth"
import useListingDetail from "../../../lib/hooks/useListingDetail"

// Components
import Error from "../../ui/Error"
import Bidders from "./Bidders"

// Util functions
import getTimeRemaining from "../../../lib/util/getTimeRemaining"
import numberInputIsValid from "../../../lib/util/numberInputValidator"

// Port number
import { settings } from "../../../settings"

// Assets
import SeeOtherListings from "./SeeOtherListings"
import ListingOverview from "./ListingOverview"

const ListingDetail = () => {
  const [bidAmount, setBidAmount] = useState("0")

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const { auth } = useAuth()
  const navigate = useNavigate()

  const { listing, fetchListing, isLister, isExpired } = useListingDetail()

  const {
    image,
    bidders,
    lister,
    desc,
    title,
    startPrice,
    finalPrice,
    expireAt,
    views,
    category,
    weight,
    height,
    width,
    length,
  } = listing

  const { listingId } = useParams()

  useEffect(() => {
    fetchListing(listingId!)
  }, [listingId])

  const onSubmitBid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!auth._id) {
      navigate("/login", {
        state: { errorMessage: "Must be logged in to do that!" },
      })
    }

    if (!numberInputIsValid(bidAmount)) {
      setIsError(true)
      setErrorMessage("Invalid Input")
      return
    }

    if (Number(bidAmount) <= finalPrice) {
      setIsError(true)
      setErrorMessage(
        "Bid amount cannot be less than or equal to the current price!"
      )
      return
    }

    const submitBid = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/THISAPICALLWILLFAIL`
      )
      const json = await response.json()

      if (!json.ok) {
        setIsError(false)
        setErrorMessage(json.message)
        return
      }

      setIsError(false)
      setErrorMessage("")
    }

    submitBid()
  }

  const timeRemaining = getTimeRemaining(expireAt)

  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-screen border-b-2 border-b-tertiary">
        <ListingOverview
          title={title}
          lister={lister}
          startPrice={startPrice}
          category={category}
          views={views}
          desc={desc}
          weight={weight}
          length={length}
          width={width}
          height={height}
        />
        <div
          className={`flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100 ${
            isExpired && "opacity-40"
          }`}
        >
          {isExpired && (
            <h1 className="text-3xl text-center font-semibold opacity-100">
              Listing Expired
            </h1>
          )}
          <h1 className="text-3xl text-center font-semibold backdrop-opacity-30">
            Biddings
          </h1>

          {!isExpired ? (
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-3">
                <h1>Current Price:</h1>
                <p className="text-lg font-semibold"> ${finalPrice}</p>
              </div>
              <div className="flex items-center gap-3">
                <h1>Expires In:</h1>
                <p className="text-lg font-semibold truncate">
                  {timeRemaining}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-3">
                <h1>Final Price:</h1>
                <p className="text-lg font-semibold"> ${finalPrice}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-semibold truncate">Expired</p>
              </div>
            </div>
          )}

          {!isLister ? (
            <form
              className="w-full flex flex-col md:flex-row gap-5 items-center"
              onSubmit={onSubmitBid}
            >
              <div className="w-full max-w-[50%]">
                <input
                  id="Bid Amount ($)"
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pt-3 pl-3 p-2 block px-0 mt-0 bg-transparent border-2 focus:outline-none focus:ring-0 border-secondary rounded-md w-full"
                />
                <label
                  htmlFor="Bid Amount ($)"
                  className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary"
                >
                  Bid Amount ($)
                </label>
              </div>
              <BidButton />
            </form>
          ) : (
            <div className="text-3xl font-semibold underline">
              You own this listing
            </div>
          )}

          {isError && <Error errorMessage={errorMessage} />}
          <Bidders bidders={bidders} isLister={isLister} />
        </div>
      </div>
      <SeeOtherListings category={category} idToFilter={listingId!} />
    </div>
  )
}

const BidButton = () => {
  return (
    <button
      className={`p-4 py-3 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-xl w-full max-w-[50%]`}
      type="submit"
    >
      Place Bid
    </button>
  )
}

export default ListingDetail
