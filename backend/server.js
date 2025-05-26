const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Memory storage for uploaded file buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Utility: Calculate age from date string
function calculateAge(dobString) {
  const dob = new Date(dobString);
  if (isNaN(dob)) return null;
  const ageDiff = Date.now() - dob.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { firstName, lastName, dob } = req.body;
    const file = req.file;

    if (!firstName || !lastName || !dob || !file) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const age = calculateAge(dob);
    if (age === null) return res.status(400).json({ error: 'Invalid DOB format.' });

    let extractedText = '';

    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file.buffer);
      extractedText = data.text;
    } else if (file.mimetype.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(file.buffer, 'eng');
      extractedText = text;
    } else {
      return res.status(400).json({ error: 'Only PDF or image files are supported.' });
    }

    res.json({
      fullName: `${firstName} ${lastName}`,
      age,
      extractedText,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
