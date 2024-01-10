const githubForm = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

let searchType = 'user';

githubForm.addEventListener('submit', handleSubmit);
userList.addEventListener('click', handleUserClick);

function handleSubmit(event) {
  event.preventDefault();

  const searchQuery = searchInput.value;
  const apiUrl = `https://api.github.com/${searchType}s?q=${searchQuery}`; // Use searchType in the URL

  fetch(apiUrl, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (searchType === 'user') {
      displayUsers(data.items);
    } else {
      displayRepos(data.items);
    }
  })
  .catch(error => console.error('Error:', error));
}

function displayUsers(users) {
  userList.innerHTML = '';

  users.forEach(user => {
    const listItem = document.createElement('li');
    const usernameElement = document.createElement('h3');
    const avatarElement = document.createElement('img');
    const linkElement = document.createElement('a');

    usernameElement.textContent = user.login;
    avatarElement.src = user.avatar_url;
    linkElement.href = user.html_url;
    linkElement.textContent = 'View Profile';

    listItem.appendChild(usernameElement);
    listItem.appendChild(avatarElement);
    listItem.appendChild(linkElement);

    userList.appendChild(listItem);
  });
}

function displayRepos(repos) {
  reposList.innerHTML = '';

  repos.forEach(repo => {
    const listItem = document.createElement('li');
    const repoNameElement = document.createElement('h3');
    const repoLinkElement = document.createElement('a');

    repoNameElement.textContent = repo.name;
    repoLinkElement.href = repo.html_url;
    repoLinkElement.textContent = repo.name;

    listItem.appendChild(repoNameElement);
    listItem.appendChild(repoLinkElement);

    reposList.appendChild(listItem);
  });
}

function handleUserClick(event) {
  const clickedUser = event.target.closest('li');
  const username = clickedUser.querySelector('h3').textContent;

  const apiUrl = `https://api.github.com/users/${username}/repos`;

  fetch(apiUrl, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => displayRepos(data))
  .catch(error => console.error('Error:', error));
}
