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
        return `${fileContent}</li>`;
      } catch (err) { pvjj
        console.error(`Error reading file ${file}:`, err);
        return `<li>${file} (Error reading file)</li>`;
      }
    }).join('');
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>File List</title>
        <style>
            body{
                margin: 0;
                padding: 0;
                background-color: rgb(15,9,19);
                display: flex;
                justify-content: center;
            }
            .container{
                margin: 10px;
                display: flex;
                width: 50rem;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color:rgba(19, 27, 54, 0.3);
                padding: 20px;
                border-radius: 20px;
            }

            .rounded{
                border-radius: 100%;
                height: 100px;
                width: 100px;
                background-color: white;
            }
            .card {        
                align-items: center;
                padding: 10px;
                gap: 24px;
                display: flex;
                color: white;
                font-size: 24px;
                border-bottom: 2px solid rgb(19, 27, 54);
            }
            .card:last-child{
                border-bottom: 0px solid white;
            }
        </style>
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

