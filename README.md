# MD2Confluence - Markdown to Confluence Converter

[**Open Live Tool**](https://simplesoft-duongdt3.github.io/markdown-2-everything/)

A modern, browser-based tool to convert Markdown text into Confluence-compatible HTML. Designed to preserve formatting, especially for tables, info panels, and code blocks, making copy-pasting into Atlassian Confluence seamless.

## Features

- **Real-time Conversion**: Instant preview as you type.
- **Confluence Styling**:
    - **Tables**: Styled with headers, borders, and backgrounds to match Confluence.
    - **Info Panels**: Blockquotes are styled as Confluence Info macros.
    - **Code Blocks**: Syntax highlighting friendly visuals.
- **Utilities**:
    - **Copy to Clipboard**: One-click copy formatted for Confluence.
    - **Download HTML**: Export the result as an HTML file.
    - **Paste from Clipboard**: Quickly insert text.
    - **Clear**: Reset the editor instantly.
- **Private & Secure**: Runs entirely in your browser; no data is sent to any server.

## Usage

### Option 1: Run Locally (No Installation)
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Run via Docker
If you prefer a containerized environment:

1. **Build and Run**:
   ```bash
   docker-compose up -d --build
   ```
2. **Access**:
   Open http://localhost:9099 in your browser.

### Option 3: GitHub Pages
This project is configured to automatically deploy to GitHub Pages.
1. Go to your repository **Settings** > **Pages**.
2. Ensure **Source** is set to `GitHub Actions`.
3. Push to `master`, and the action will deploy the `src/` folder.

## Tech Stack

- **HTML5**: Semantic structure.
- **CSS3**: Variable-based styling, responsive flexbox layout.
- **JavaScript (Vanilla)**: DOM manipulation and Clipboard API.
- **Marked.js**: Fast, lightweight Markdown parsing.
- **Docker**: Nginx-based containerization.

## Project Structure

```
.
├── src/
│   ├── index.html      # Main application structure
│   ├── style.css       # Styling (Markdown & Confluence themes)
│   └── script.js       # Logic (Conversion, Clipboard, Events)
├── Dockerfile          # Container definition
├── docker-compose.yml  # Container orchestration
└── README.md           # Project documentation
```

## Contributing

Feel free to fork and submit Pull Requests. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
