const ProfilePage = () => {
  const logoutHandler = () => {
    sessionStorage.removeItem('token')
  }

  return (
    <div>
      <span>ProfilePage</span>
      <a href="/login" onClick={logoutHandler}>Logout</a>
    </div>
  )
}

export default ProfilePage
