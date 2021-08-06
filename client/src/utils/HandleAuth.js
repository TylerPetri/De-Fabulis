import fetchJSON from './API';

async function handleAuth() {
  let username = sessionStorage.libraryOfStories_user;
  let session = sessionStorage.libraryOfStories_session;
  if (username) {
    const resAuth = await fetchJSON('/api/authentication', 'POST', {
      username: username,
      session: session,
      type: 'checkAuth',
    });
    if (resAuth.message === 'No auth' || resAuth.message === 'No such being!') {
      sessionStorage.removeItem('libraryOfStories_user');
      sessionStorage.removeItem('libraryOfStories_session');
      return { userLoggedIn: false, user: '' };
    } else if (resAuth.message !== 'No such being!') {
      const res = await fetchJSON(`/api/authentication/${username}`);
      if (res.message === true) {
        return { userLoggedIn: true, user: username };
      } else if (res.message === 'Not logged in') {
        return { mustBeLoggedIn: true };
      }
    }
  } else {
    return { mustBeLoggedIn: true };
  }

  return 'Authentication failed';
}

export { handleAuth };
