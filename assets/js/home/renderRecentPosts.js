import { getPosts } from '../utils/getPost.js';
import getAttributes from '../utils/getAttributes.js';
import stringCutter from '../utils/stringCutter.js';

const heroPrincipalDiv = document.querySelector('.hero-principal-div');
const heroNewsContainer = document.querySelector('.hero-news-container');

function largePost(
  postURL,
  imgURL,
  imgName,
  category,
  title,
  authorName,
  date,
  description
) {
  const formattedDescription = stringCutter(description, 200);

  const firstPost = `
                    <a href="${postURL}">
                        <div class="hero-first-news">
                            <div class="hero-img-wrapper">
                              <img class="hero-img" src="${imgURL}" >
                            </div>
                            <div class="hero-infos">
                                <p class="category">${category}</p>
                                <h2>${title}</h2>
                                <div class="hero-author-infos">
                                    <p class="author">${authorName}</p>
                                    <img
                                      src="./assets/img/bolinha.svg"
                                      alt="ball"
                                    />
                                    <p class="data">${date}</p>
                                </div>
                                <p class="news-description">
                                    ${formattedDescription}
                                </p>
                            </div>
                        </div>
                    </a>
  `;

  return firstPost;
}

function smallPost(
  postURL,
  postImgURL,
  postImgName,
  category,
  title,
  date,
  description
) {
  const formattedDescription = stringCutter(description, 100);

  const smallPost = `
              <a href="${postURL}">
                <div class="hero-news">
                  <img
                    src="${postImgURL}"
                    alt="${postImgName}"
                    class="img-down"
                  />
                  <div class="second-hero-info">
                    <p class="category">${category}</p>
                    <h3>${title}</h3>
                    <p class="data">${date}</p>
                    <div class="news-headline">
                      <p>${formattedDescription}</p>
                    </div>
                  </div>
                </div>
              </a>
  `;

  return smallPost;
}

async function renderPosts() {
  try {
    const posts = await getPosts();
    console.log(posts);
    const slicePosts = posts.slice(-6, posts.length);
    slicePosts.reverse();

    if (slicePosts.length == 1) {
      const attb = getAttributes(slicePosts[0]);
      const firstPost = largePost(
        attb.postURL,
        attb.imgURL,
        attb.imgName,
        attb.category,
        attb.title,
        attb.authorName,
        attb.date,
        attb.description
      );

      heroPrincipalDiv.innerHTML += firstPost;
    } else if (slicePosts.length == 2) {
      const attb = getAttributes(slicePosts[0]);
      const firstPost = largePost(
        attb.postURL,
        attb.imgURL,
        attb.imgName,
        attb.category,
        attb.title,
        attb.authorName,
        attb.date,
        attb.description
      );
      const attb2 = getAttributes(slicePosts[1]);
      const secondPost = smallPost(
        attb2.postURL,
        attb2.imgURL,
        attb2.imgName,
        attb2.category,
        attb2.title,
        attb2.date,
        attb2.description
      );

      heroPrincipalDiv.innerHTML += firstPost;
      heroPrincipalDiv.innerHTML += secondPost;
    } else {
      const attb = getAttributes(slicePosts[0]);
      const firstPost = largePost(
        attb.postURL,
        attb.imgURL,
        attb.imgName,
        attb.category,
        attb.title,
        attb.authorName,
        attb.date,
        attb.description
      );
      const attb2 = getAttributes(slicePosts[1]);
      const secondPost = smallPost(
        attb2.postURL,
        attb2.imgURL,
        attb2.imgName,
        attb2.category,
        attb2.title,
        attb2.date,
        attb2.description
      );
      slicePosts.shift();
      slicePosts.shift();

      heroPrincipalDiv.innerHTML += firstPost;
      heroPrincipalDiv.innerHTML += secondPost;

      for (const i in slicePosts) {
        const attb = getAttributes(slicePosts[i]);
        const smallNewsPost = smallPost(
          attb.postURL,
          attb.imgURL,
          attb.imgName,
          attb.category,
          attb.title,
          attb.date,
          attb.description
        );
        heroNewsContainer.innerHTML += smallNewsPost;
      }
    }
  } catch (error) {
    heroPrincipalDiv.innerHTML = 'Erro ao carregar notícias';
  }
}

renderPosts();
