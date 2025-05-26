project-root/
├── backend/
│   └── server.js              
│
├── frontend/
│   ├── pages/
│   │   ├── upload.js           
│   │   └── result.js          
│   ├── styles/
│   │   └── globals.css         
│   └── tailwind.config.js      
│
└── README.md                   




# File Uploader & Text Extractor App

A full-stack web app using:

- PDF/Image Upload
- Text Extraction with Tesseract.js / pdf-parse
- Age Calculation from Date of Birth
- Frontend: Next.js + Tailwind CSS
- Backend: Express.js

## Features

- Upload a PDF or image
- Enter user details (first name, last name, DOB)
- Extract and display raw text
- Show calculated age and full name

## Setup

### Backend


cd backend
npm install
node server.js

Runs on http://localhost:8080

### Frontend

cd frontend
npm install
npm run dev

Runs on http://localhost:3000/upload

Tech Stack

    React (Next.js)

    Tailwind CSS

    Express.js

    multer, pdf-parse, tesseract.js


