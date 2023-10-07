const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const directoryPath = './your-cards/';
app.get('/', (req, res) => {

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Internal Server Error');
    }


    const fileList = files.map((file) => {
      const filePath = path.join(directoryPath, file);
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return `${fileContent}`;
      } catch (err) {
        console.error(`Error reading file ${file}:`, err);
        return `<li>${file} (Error reading file)</li>`;
      }
    }).join('');
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>File List</title>
      </head>
      <body>
        <div class="container">
          ${fileList}
        </div>
      </body>
      </html>
    `;

    res.send(htmlResponse);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

