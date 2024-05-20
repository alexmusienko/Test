document.addEventListener('DOMContentLoaded', async () => {
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});

  await getPost();
});

const usersInfo = [
  {
    name: 'Zar Zakharov',
    username: '@severenit',
    seed: 'Loki',
  },
  {
    name: 'Pablo Picaso',
    username: '@pablo.caamano',
    seed: 'Kiki',
  }
];

async function getPost() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
  const posts = await response.json();
  const loaderEl = document.getElementById('loader');
  const postContainerEl = document.getElementById('posts');
  const time = new Intl.RelativeTimeFormat('ru', {style: 'short', numeric: 'auto'});

  posts.forEach((post, index) => {
    postContainerEl.insertAdjacentHTML('beforeend', postTemplate({...post, time: time.format(-index, 'minute')}));
  });

  loaderEl.style.display = 'none';
}

function postTemplate({id, userId, body, time}) {
  return `
    <div class="tweet fullw" data-id="${id}">
      <div class="tweet-header-icon"></div>
      <div class="tweet-header-text"></div>
      <div class="tweet-author">
        <div class="tweet-aut-prof"
             style="background-image:url(https://api.dicebear.com/7.x/thumbs/svg?seed=${usersInfo[userId - 1].seed});"></div>
      </div>
      <div class="tweet-content">
        <div class="tweet-title fullw">
          <a class="tweet-acc" href="#">${usersInfo[userId - 1].name}</a>
          <p class="tweet-usr">${usersInfo[userId - 1].username}</p>
          <p class="tweet-date">· ${time}</p>
        </div>
        <p class="content fullw">${body}</p>
        <div class="tweet-actions fullw">
          <div class="action comment"><span class="material-symbols-outlined">forum</span></div>
          <div class="action retweet"><span class="material-symbols-outlined">reply</span></div>
          <div class="action like"><span class="material-symbols-outlined">favorite</span></div>
        </div>
      </div>
    </div>
    `;
}
