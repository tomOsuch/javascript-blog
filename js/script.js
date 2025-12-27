const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();

    /* TODO [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let activeLink of activeLinks) {
        activeLink.classList.remove("active");
    }

    /* TODO [DONE] add class 'active' to the clicked link */
    console.log("clickedElement:", clickedElement);
    clickedElement.classList.add("active");

    /* TODO [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(".posts article.active");
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove("active");
    }

    /* TODO [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");

    /* TODO [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* TODO [DONE] add class 'active' to the correct article */
    targetArticle.classList.add("active");

    /* TODO [DONE] add class 'active' to the correct article */
    targetArticle.classList.add("active");
};

const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

const generateTitleLinks = function () {
    /* TODO [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";
    /* TODO [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    //let html = "";

    for (let article of articles) {
        /* TODO [DONE] get the article id */
        const articleId = article.getAttribute("id");
        /* TODO [DONE] find the title element */
        const titleElement = article.querySelector(optTitleSelector);
        /* TODO [DONE] get the title from the title element */
        const articleTitle = titleElement.innerHTML;
        /* TODO [DONE] create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + "</span></a></li>";
        /* TODO [DONE] insert link into titleList */
        //html = html + linkHTML;

        titleList.insertAdjacentHTML("beforeend", linkHTML);
    }
    //titleList.innerHTML = html;
};

generateTitleLinks();

const links = document.querySelectorAll(".titles a");

for (let link of links) {
    link.addEventListener("click", titleClickHandler);
}
