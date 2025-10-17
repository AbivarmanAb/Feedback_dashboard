const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let feedbacks = []; // Temporary in-memory storage

// POST /feedback - Add feedback
app.post('/feedback', (req, res) => {
  const { name, comment } = req.body;
    if (!name || !comment) {
        return res.status(400).json({ message: "Name and Comment are required" });
          }
            const newFeedback = { id: feedbacks.length + 1, name, comment };
              feedbacks.push(newFeedback);
                res.status(201).json({ message: "Feedback added successfully", feedback: newFeedback });
                });

                // GET /feedback - Retrieve all feedback
                app.get('/feedback', (req, res) => {
                  res.json(feedbacks);
                  });

                  const PORT = 5000;
                  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));