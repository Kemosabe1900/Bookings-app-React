# Bookings App (React)

A simple booking management app built with React, Axios, and json-server.  
Users can add, view, and delete bookings with a modern, responsive UI.

## Features

- **Create** new bookings with name, date, and time
- **View** all bookings in a card layout
- **Delete** bookings (with backend sync)
- **Form validation** for user input
- **Responsive design** for desktop and mobile

## Tech Stack

- **Frontend:** React, Axios, CSS (flexbox, responsive design)
- **Backend:** [json-server](https://github.com/typicode/json-server) (mock REST API)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [json-server](https://github.com/typicode/json-server)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kemosabe1900/Bookings-app-React.git
   cd Bookings-app-React
   ```

2. **Install dependencies (only needed once per setup):**

   ```bash
   npm install
   ```

3. **Install json-server globally (if you haven't already):**n
   pm install -g json-server

4. **Start the backend (json-server):**
   json-server --watch db.json --port 3001

5. **Start the React app:**
   npm start
