const NavItem = ({ id, label, icon, isActive, onClick }) => {

  const handleClick = () => {
    gsap.ScrollTrigger.refresh()
  }

  /* const handleClick = (e) => {
    e.preventDefault()
    onClick()
  } */

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
