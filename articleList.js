document.addEventListener("DOMContentLoaded", function () {
  // Get reference to the article titles list
  const articleTitles = document.getElementById("article-titles");

  // Function to render the list of article titles
  function renderArticleList(articles) {
    articles.forEach((article) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      // Pass the Markdown file location as a URL parameter
      link.href = `article.html?file=${encodeURIComponent(
        "articles/" + article.markdownFile
      )}`;
      link.textContent = article.title;
      listItem.appendChild(link);
      articleTitles.appendChild(listItem);
    });
  }

  // Fetch articles data from articles.json
  fetch("articles/articles.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      try {
        // Initial rendering of the article list
        renderArticleList(data);
      } catch (error) {
        console.error("Error processing articles:", error);
      }
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
    });
});
