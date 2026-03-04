'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

/* 1. OBSŁUGA KLIKNIĘCIA W TYTUŁ (LEWA KOLUMNA) */
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

/* 2. GENEROWANIE LISTY TYTUŁÓW (Z FILTROWANIEM) */
const generateTitleLinks = function (customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};

/* 3. GENEROWANIE TAGÓW */
const generateTags = function () {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      html += tagLinkHTML;
    }
    tagsWrapper.innerHTML = html;
  }
};

/* 4. GENEROWANIE AUTORÓW (NOWOŚĆ) */
const generateAuthors = function () {
  /* Znajdź wszystkie artykuły */
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    /* Znajdź wrapper autora wewnątrz artykułu */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    
    /* Pobierz autora z atrybutu data-author */
    const authorName = article.getAttribute('data-author');

    /* Wygeneruj HTML linku (używamy prefixu #author- dla przejrzystości) */
    const linkHTML = 'by <a href="#author-' + authorName + '">' + authorName + '</a>';

    /* Wstaw HTML do wrappera */
    authorWrapper.innerHTML = linkHTML;
  }
};

/* 5. OBSŁUGA KLIKNIĘCIA W TAG */
function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }

  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let foundTagLink of foundTagLinks) {
    foundTagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

/* 6. OBSŁUGA KLIKNIĘCIA W AUTORA (NOWOŚĆ) */
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  
  /* Pobierz href i wyciągnij samo imię i nazwisko */
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  /* Wywołaj filtrowanie listy tytułów (używając operatora "=" dla dokładnego dopasowania) */
  generateTitleLinks('[data-author="' + author + '"]');
}

/* 7. DODAWANIE LISTENERÓW */
function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

function addClickListenersToAuthors() {
  /* Znajdź wszystkie linki do autorów */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

/* URUCHOMIENIE LOGIKI */
generateTitleLinks();
generateTags();
generateAuthors(); // Uruchomienie generowania autorów

addClickListenersToTags();
addClickListenersToAuthors(); // Dodanie nasłuchiwania na autorów