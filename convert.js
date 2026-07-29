const fs = require("fs");

const file = "data.js";

let text = fs.readFileSync(file, "utf8");

// Sirf un entries ko convert karega jahan platformUrl string hai aur urls nahi hai
text = text.replace(
  /platformUrl:\s*"([^"]+)"/g,
  (_, url) => {
    return `urls: {
      "480p": "/quality-not-available.html",
      "720p": "${url}",
      "1080p": "/quality-not-available.html"
    }`;
  }
);

fs.writeFileSync(file, text);

console.log("✅ data.js updated successfully!");