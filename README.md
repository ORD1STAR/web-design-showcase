<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:f97316,100:be185d&height=200&section=header&text=Web%20Design%20Showcase&fontSize=48&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Six%20responsive%20landing%20pages%20for%20small%20businesses&descAlignY=58" alt="Web Design Showcase banner" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&center=true&vCenter=true&width=700&lines=Six+framework-free+landing+pages+and+prototypes;Plain+HTML%2C+Tailwind+CSS+and+vanilla+JavaScript;Mobile-first+with+floating+contact+buttons;No+build+step%3A+open+and+browse" alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-CDN-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/status-portfolio-blue?style=for-the-badge" alt="Status" />
</p>

<p align="center">
  <img src="docs/collage.png" alt="Collage of the six sites" width="860" />
</p>

## Table of contents

- [Overview](#-overview)
- [Features](#-features)
- [The sites and screenshots](#-the-sites-and-screenshots)
- [Architecture](#-architecture)
- [Tech stack](#-tech-stack)
- [Requirements](#-requirements)
- [Installation and configuration](#-installation-and-configuration)
- [Usage](#-usage)
- [Project structure](#-project-structure)
- [Testing](#-testing)
- [Troubleshooting and FAQ](#-troubleshooting-and-faq)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## 🧭 Overview

**Problem.** Small-business clients (a coffee shop, a kitchen maker, a clinic, a jewelry store, a pizzeria, a window seller) need a credible, mobile-friendly web page quickly, often without a build pipeline or hosting budget.

**Solution.** Six independent, framework-free landing pages and UI prototypes built with plain HTML, Tailwind CSS and vanilla JavaScript. Each one opens straight from its HTML file, is mobile-first and, where relevant, includes floating contact buttons (call / WhatsApp / Messenger / Telegram).

## ✨ Features

- Mobile-first layouts for every site, with mobile screenshots captured for each
- Glass-style hero card, menu and origins sections (coffee shop)
- Shop grid with price-range filter, top-rated sidebar, cart badge and WhatsApp bubble (pizza restaurant)
- Looping muted hero video, category circles and product cards (jewelry store)
- Services, doctors and online-appointment sections with floating messaging buttons (clinic)
- French-language catalogue page with a contact form that composes a `mailto:` message (kitchen brand)
- Data-driven purchase form: models, colours and preview image loaded from `config.json` by `form.js` (window configurator)

## 🎬 The sites and screenshots

Each site lives in `sites/<name>/`.

| Site | What it demonstrates | Preview |
|---|---|---|
| `coffee-shop` | Hero with glass-style card, menu and origins sections, image-rich layout | ![coffee](docs/coffee-shop.gif) |
| `pizza-restaurant` | Shop grid, price-range filter, top-rated sidebar, cart badge, WhatsApp bubble | ![pizza](docs/pizza-restaurant.gif) |
| `jewelry-store` | Looping muted hero video, category circles, product cards | ![jewelry](docs/jewelry-store.gif) |
| `doctor-clinic` | Services, doctors, online-appointment sections and floating messaging buttons | ![clinic](docs/doctor-clinic.gif) |
| `kitchen-brand` | French-language catalogue page for a kitchen maker, contact form that composes a `mailto:` message | ![kitchen](docs/kitchen-brand.png) |
| `window-configurator` | Data-driven purchase form: models, colours and preview image loaded from `config.json` by `form.js` | ![form](docs/window-configurator.png) |

<details>
<summary><b>Mobile views</b></summary>

| Coffee | Pizza | Jewelry | Clinic | Kitchen |
|---|---|---|---|---|
| ![](docs/coffee-shop-mobile.png) | ![](docs/pizza-restaurant-mobile.png) | ![](docs/jewelry-store-mobile.png) | ![](docs/doctor-clinic-mobile.png) | ![](docs/kitchen-brand-mobile.png) |

</details>

## 🏗 Architecture

There is no shared code or build step: every site is a self-contained page that pulls Tailwind and fonts from public CDNs. The window configurator is the only one with data loading.

```mermaid
flowchart LR
    subgraph Static["sites/ (static files)"]
        A[coffee-shop]
        B[pizza-restaurant]
        C[jewelry-store]
        D[doctor-clinic]
        E[kitchen-brand]
        F[window-configurator<br/>form.html + form.js + form.css]
    end
    CDN["Public CDNs<br/>Tailwind, Google Fonts, Font Awesome, stock photos"] --> Static
    CFG[(config.json)] -- fetch --> F
    E -- mailto link --> MAIL[User's mail client]
```

## 🧰 Tech stack

| Layer | Tools |
| --- | --- |
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN build) |
| Behaviour | Vanilla JavaScript |
| Fonts / icons | Google Fonts (Inter, Montserrat), Font Awesome (jewelry store) |

## 📋 Requirements

| Item | Requirement |
| --- | --- |
| OS | Windows, macOS or Linux |
| Browser | Any modern browser |
| Static server | Any (for example Python 3 `http.server`). Only needed for the window configurator, which `fetch`es `config.json`; the other pages open from the file system |
| Network | Internet access: Tailwind and most stock photos load from public CDNs |
| Runtime / database / GPU | None |
| Ports | `8000` in the example below (any free port works) |
| Accounts / API keys | None |
| Environment variables | None |

## ⚙ Installation and configuration

```bash
git clone https://github.com/ORD1STAR/web-design-showcase.git
cd web-design-showcase
```

There is no install step and no configuration. The contact links in the demo pages are placeholders (`wa.me/968XXXXXXXX`, `tel:+213XXXXXXXXX`, `contact@example.com`); replace them with real values before using a page. The window configurator is configured through `sites/window-configurator/config.json`.

## 🚀 Usage

Serve the repository root with any static server:

```bash
python -m http.server 8000
# then open
#   http://localhost:8000/sites/coffee-shop/index.html
#   http://localhost:8000/sites/window-configurator/form.html
```

Other pages: `sites/pizza-restaurant/index.html`, `sites/jewelry-store/index.html`, `sites/doctor-clinic/index.html`, `sites/kitchen-brand/index.html`.

## 🗂 Project structure

<details>
<summary><b>Show tree</b></summary>

```
sites/
  coffee-shop/          index.html
  pizza-restaurant/     index.html
  jewelry-store/        index.html, jews.mp4 (hero video)
  doctor-clinic/        index.html
  kitchen-brand/        index.html, imgs/
  window-configurator/  form.html, form.js, form.css, config.json, assets/
docs/                   screenshots and scroll GIFs (captured with headless Chromium)
```

</details>

## 🧪 Testing

There is no automated test suite; these are static visual prototypes. Check them manually in a browser at desktop and mobile widths.

## 🩺 Troubleshooting and FAQ

<details>
<summary><b>The window configurator shows no models or colours</b></summary>

It loads `config.json` with `fetch`, which browsers block on `file://` URLs. Serve the repository with a static server as shown in Usage.

</details>

<details>
<summary><b>Pages look unstyled or images are missing</b></summary>

Tailwind and most stock photos load from public CDNs, so you need an internet connection. Several stock photos are hot-linked from third-party sites for prototyping and may disappear.

</details>

<details>
<summary><b>Are the phone numbers and emails real?</b></summary>

No. Brand names, phone numbers and e-mail addresses in the demo pages are placeholders. Contact details from the original client pages were removed.

</details>

<details>
<summary><b>Does the configurator form submit anywhere?</b></summary>

No, it is a front-end prototype.

</details>

## 🗺 Roadmap

- [x] Six responsive landing pages and prototypes
- [x] Mobile screenshots and scroll GIFs for the pages
- [ ] Replace hot-linked stock photos with licensed local assets
- [ ] Bundle Tailwind locally instead of the CDN build for production use
- [ ] Wire the configurator form and contact buttons to a real back end

Original screen-recording videos of the pages (about 35 MB) were left out of the repository; the GIFs in `docs/` are freshly captured from the running pages.

## 🤝 Contributing

Issues and pull requests are welcome. Keep each site self-contained and use placeholder contact details only.

## 📄 License

Released under the [MIT License](LICENSE).

## 👤 Author

<table>
  <tr>
    <td><b>Hannoun Amine Amar</b><br/>AI Engineer / Fullstack Developer, Algeria</td>
    <td>
      <a href="https://www.linkedin.com/in/hannoun-amine/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
      <a href="mailto:hannoun.amine25@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
      <a href="https://github.com/ORD1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
    </td>
  </tr>
</table>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:f97316,100:be185d&height=120&section=footer" alt="footer" />
</p>
