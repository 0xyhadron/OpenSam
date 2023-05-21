const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Handle POST request to save text
app.post('/save', (req, res) => {
  const text = req.body.textInput;

  // Save text to a text file
  fs.appendFile('textData.txt', text + '\n', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving text');
    } else {
      res.send('Text saved successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
