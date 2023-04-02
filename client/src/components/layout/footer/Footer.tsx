import useAuth from "../../../lib/hooks/useAuth"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  const { auth } = useAuth()

  return (
    <footer className="px-4 py-2 flex flex-row justify-between items-center bg-secondary text-primary">
      <nav className="hidden md:flex flex-row gap-4">
        {auth._id ? (
          <>
            <RouterLink
              to="/app"
              routerLinkText="App"
              twClasses="border p-2 border-main w-20 text-center"
            />
            <RouterLink
              to="/profile"
              routerLinkText="Profile"
              twClasses="border p-2 border-main w-20 text-center"
            />
          </>
        ) : (
          <>
            <RouterLink
              to="/"
              routerLinkText="Home"
              twClasses="border p-2 border-main w-20 text-center"
            />
            <RouterLink
              to="/login"
              routerLinkText="Login"
              twClasses="border p-2 border-main w-20 text-center"
            />
            <RouterLink
              to="/register"
              routerLinkText="Register"
              twClasses="border p-2 border-main w-20 text-center"
            />
            <RouterLink
              to="/dev"
              routerLinkText="Dev"
              twClasses="border p-2 border-main w-20 text-center"
            />
          </>
        )}
      </nav>
      <h1 className="text-2xl font-bold">Synapse</h1>
    </footer>
  )
}

export default Footer
