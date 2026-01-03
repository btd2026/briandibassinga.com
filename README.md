# briandibassinga.com

A clean, minimal portfolio for Brian DiBassinga featuring an animated SVG hero, article-style project pages, and a dark theme inspired by creative developer portfolios.

## Live Site
- **https://briandibassinga.com** – Hosted on GitHub Pages

## Design Inspiration
- **Home page** – Inspired by [Fabio Ottaviani's portfolio](https://fabioottaviani.com/) with animated SVG name and minimal single-page layout
- **Project pages** – Inspired by [Mamboleoo's article style](https://www.mamboleoo.be/) with blog-like structure, hero images, tags, and side metadata

## Features
- Animated SVG hero with name draw-in effect
- Experience section with timeline-style entries
- Selected works grid with hover overlay effects
- Article-style project pages with:
  - Hero images and teaser descriptions
  - Technology tags
  - Side metadata panel (date, external links)
  - Rich content blocks (timelines, milestones, workflow steps)
- Responsive navigation and footer

## Project Structure
```
/
├── index.html          # Home page
├── projects.html       # Projects listing
├── about.html          # About page
├── contact.html        # Contact page
├── resume.html         # Resume page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # Interactive components
├── assets/
│   ├── pfp.jpg         # Profile photo
│   ├── discord.png     # Project thumbnails
│   ├── zen.png
│   └── thesis.png
└── projects/
    ├── discord.html        # Discord Translator project
    ├── zen-video-agency.html  # Zen Video Agency project
    └── thesis-ml.html       # ML Thesis project
```

## Editing

### Home Page
Edit `index.html` to update:
- Hero intro text (line ~43-46)
- Experience section (line ~51-56)
- Selected works grid (line ~67-87)
- Contact links (line ~95-98)

### Project Pages
Each project page follows the article-style template:
- Update hero info in `.article-header-info`
- Add content blocks in `.article-content`
- Modify tags in `.article-tags`

### Styling
Main styles in `css/styles.css`:
- Hero animations: lines ~1510-1574
- Works grid: lines ~1610-1680
- Article layout: lines ~1746-1908
- Components (steps, milestones): lines ~1910-2003

## Deployment
This site is deployed on **GitHub Pages** from the `main` branch. Pushing to `main` automatically updates the live site.

## Contact
- Email: [briandibassinga@gmail.com](mailto:briandibassinga@gmail.com)
- GitHub: [@briandibassinga](https://github.com/briandibassinga)
- LinkedIn: [linkedin.com/in/brian-dibassinga](https://www.linkedin.com/in/brian-dibassinga/)
