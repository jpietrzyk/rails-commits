const configureOauth = () => {
  return (
    {
      backend: {
        apiUrl:       'http://localhost:3000',
        signOutPath:  null,
        authProviderPaths: {
          github: '/auth/github'
        }
      },
      cookies: document.cookie,
      currentLocation: document.URL
    }
  )
}

export default configureOauth
