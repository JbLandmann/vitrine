const NavItem = ({ id, label, icon, isActive, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  return (
    <a
      href={`#${id}`}
      className={`nav-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}

export default NavItem
