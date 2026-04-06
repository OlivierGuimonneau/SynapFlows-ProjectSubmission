# SynapFlows – Discovery Form

## Overview
A single-page, multi-step project qualification form for SynapFlows, a digital project agency. Clients fill out this 6-step form to describe their project needs, and the data is submitted to an Airtable database to generate commercial proposals.

## Tech Stack
- **Language:** HTML5, CSS3, Vanilla JavaScript (all embedded in a single HTML file)
- **External dependencies:** Google Fonts (Inter, Instrument Sans)
- **API Integration:** Airtable REST API (configured via `AIRTABLE_CONFIG` object in the HTML)

## Project Structure
```
.
├── synapflows-formulaire-airtable.html   # Source form (original)
├── index.html                            # Served at root (copy of the above)
├── synapflows-logo.jpg                   # Company logo
└── replit.md                             # This file
```

## Running the App
The app is served as a static site using Python's built-in HTTP server:
- **Workflow:** "Start application"
- **Command:** `python3 -m http.server 5000 --bind 0.0.0.0 --directory .`
- **Port:** 5000

## Airtable Configuration
The form submits data to Airtable. To configure the API connection, edit the `AIRTABLE_CONFIG` object inside `synapflows-formulaire-airtable.html` (and `index.html`):
```javascript
const AIRTABLE_CONFIG = {
    baseId: 'YOUR_BASE_ID',
    tableName: 'YOUR_TABLE_NAME',
    token: 'YOUR_API_TOKEN'
};
```

## Deployment
Configured as a **static** deployment serving the root directory (`.`).
