const ProfilePage = () => {
  const logoutHandler = () => {
    sessionStorage.removeItem('token')
  }

  return (
    <div>
      <div>ProfilePage</div>
      <a href="/login" onClick={logoutHandler}>Logout</a>
    </div>
  )
}

export default ProfilePage
