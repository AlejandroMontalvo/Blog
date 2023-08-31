document.addEventListener("DOMContentLoaded", function () {
  const articleBody = document.getElementById("article-body");

  // Function to extract URL parameter
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Extract the Markdown file location from the URL
  const markdownFile = getParameterByName("file");
  var converter = new showdown.Converter();
  converter.setFlavor("github");
  // Fetch and display the Markdown content
  fetch(markdownFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((markdownContent) => {
      var htmlContent = converter.makeHtml(markdownContent);

      articleBody.innerHTML = htmlContent;
      // Apply syntax highlighting using Highlight.js
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block);
      });
    })
    .catch((error) => {
      console.error("Error fetching or displaying article:", error);
    });
});
