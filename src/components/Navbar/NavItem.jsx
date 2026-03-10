const NavItem = ({ id, label, icon, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  return (
    <a
      href={`#${id}`}
      className="nav-item"
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}

export default NavItem
