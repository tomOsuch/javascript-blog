const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();

    /* TODO [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* TODO [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* TODO [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* TODO [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* TODO [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* TODO [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

    /* TODO [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}