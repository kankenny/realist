import RouterLink from "../../ui/RouterLink"

const Header = () => {
  return (
    <header className="px-4 py-2 flex flex-row justify-between items-center bg-secondary text-primary">
      <h1 className="text-2xl font-bold">AkhtarsList</h1>
      <nav className="hidden md:flex flex-row gap-4">
        <RouterLink to="/home" routerLinkText="Home" />
        <RouterLink to="/login-register" routerLinkText="Start" />
        <RouterLink to="/dev" routerLinkText="Dev" />
      </nav>
    </header>
  )
}

export default Header
