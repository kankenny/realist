import { useState } from "react"

const SearchBar = () => {
  const [query, setQuery] = useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Do something with the search query, such as send it to an API
    console.log(query)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex-grow mx-auto hidden md:block"
    >
      <button type="submit" className="absolute t-0 text-tertiary h-full p-2">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
            clip-rule="evenodd"
          ></path>
          <path
            fill-rule="evenodd"
            d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="border bg-primary h-10 pl-8 pr-10 text-sm focus:outline-none focus:border-gray-500 text-black w-full max-w-lg"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  )
}

export default SearchBar
