document.addEventListener("DOMContentLoaded", function () {
  // Get reference to the article titles list
  const articleTitles = document.getElementById("article-titles");

  // Function to render the list of article titles
  function renderArticleList(articles) {
    articles.forEach((article) => {
      // Create a list item for each article
      const listItem = document.createElement("li");
      listItem.classList.add("article-item"); // Class for the list item

      // Create a link for each article with the Markdown file location as a URL parameter
      const link = document.createElement("a");
      link.href = `article.html?file=${encodeURIComponent(
        "articles/" + article.markdownFile
      )}`;

      // Create a paragraph for the article title
      const titleParagraph = document.createElement("p");
      titleParagraph.classList.add("article-title"); // Class for the article title
      titleParagraph.textContent = article.title;

      // Create a paragraph for the article date
      const dateParagraph = document.createElement("p");
      dateParagraph.classList.add("article-date"); // Class for the article date
      dateParagraph.textContent = article.date;

      // Append the title and date paragraphs to the list item
      listItem.appendChild(titleParagraph);
      listItem.appendChild(dateParagraph);

      // Append the link (entire list item) to the article titles list
      articleTitles.appendChild(link);

      // Append the list item to the link (entire list item)
      link.appendChild(listItem);

      // Add a click event listener to the entire list item
      listItem.addEventListener("click", () => {
        window.location.href = link.href;
      });
    });
  }

  // Fetch articles data from articles.json
  fetch("articles/articlesData.json")
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
