let cards = [
  {
    apkName: 'Educational bot',
    imageLink: 'img/edu.png',    
    downloadLink: 'app/educational bot v2.0.1 1.0.apk',
    author: 'Metoushela Walker',
    githubLink: 'https://github.com/'
  },
  {
    apkName: 'Tic-Tac-Toe 2 player Game',
    imageLink: 'img/tick.png',
    downloadLink: 'app/tic-tac-toe 1.0.apk',
    author: 'Metoushela Walker',
    githubLink: 'https://github.com/'
  },
  {
    apkName: 'Wheather app',
    imageLink: 'img/weather.png',
    downloadLink: './Apks/fitness-tracker/fitness-tracker.apk',
    author: 'Metoushela Walker',
    githubLink: 'https://github.com/'
  }
];

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS               */
/*                                                                            */
/* -------------------------------------------------------------------------- */

/* Shuffles cards' order */
function shuffle(o) {
  for (
    let j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

/* Shuffle and generate cards */
const getCardContents = (cardList) => {
  return shuffle(cardList).map((c) => 
    `<li class="card">` +
      `<a href='${c.pageLink}'>` +
      `<img class="apk-image" src='${c.imageLink}' alt='${c.apkName}' style="width: 100%" />` +
      `</a>` +
      `<div class="flex-content">` +
      `<a href='${c.pageLink}'><h3 class="apk-title">${c.apkName}</h3></a>` +
      `<p class='author'><a href="${c.githubLink}" target="_blank"><i class="fab fa-github"></i> ${c.author}</a></p>` +
      `<a href='${c.downloadLink}' class='download-btn' download>Download APK</a>` +
      `</div>` +
    `</li>`
  ).join('');
};

/* Injects cards list html into the DOM */
let contents = getCardContents(cards);
document.getElementById('cards').innerHTML = contents;

/* Adds scroll to top arrow button */
document.addEventListener('DOMContentLoaded', function () {
  const goToTopBtn = document.querySelector('.go-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      goToTopBtn.classList.add('active');
    } else {
      goToTopBtn.classList.remove('active');
    }
  });

  goToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

/* Search filter - by author or by name - update displayed cards */
function searchCard(event) {
  let timeoutId = null;
  if (timeoutId) clearTimeout(timeoutId);

  const value = event.target.value.toLowerCase();
  let filteredCards;
  if (value) {
    filteredCards = cards.filter(({ apkName, githubLink, author }) => {
      const _apkName = apkName.toLowerCase();
      const _githubLink = githubLink.toLowerCase();
      const _author = author.toLowerCase();
      return [_apkName, _githubLink, _author].some((detail) =>
        detail.includes(value)
      );
    });
    contents = getCardContents(filteredCards);
  } else {
    contents = getCardContents(cards);
  }
  timeoutId = setTimeout(() => {
    document.getElementById('cards').innerHTML = contents;
  }, 200);
}
document.getElementById('search-bar').addEventListener('keyup', searchCard);
