# Web Profile

Personal portfolio website for Earl Conrad D. Bala.

## Project Structure

```text
webProfile/
├─ WebProfile.html
├─ functions.js
├─ submit.php
├─ css/
│  ├─ cvstyle.css
│  └─ responsive .css
├─ assets/
└─ mycv/
```

## Files

- `WebProfile.html` contains the main page markup.
- `css/cvstyle.css` contains the main desktop/base styles.
- `css/responsive .css` is intended for responsive/mobile styles.
- `functions.js` contains the page interactions like navigation, accordion, typewriter, hero slider, and dark mode toggle.
- `assets/` contains images used by the portfolio.
- `submit.php` can be used for form handling when the contact section is added.

## How To Run

Open `WebProfile.html` in a browser.

If you add PHP form handling later, run the project through a local PHP server instead:

```bash
php -S localhost:8000
```

Then open:

```text
http://localhost:8000/WebProfile.html
```

## Notes

The responsive CSS file currently has a space in its filename: `responsive .css`.
Consider renaming it to `responsive.css` to make linking and debugging easier.

If you rename it, link it in `WebProfile.html` after the main stylesheet:

```html
<link rel="stylesheet" href="css/cvstyle.css">
<link rel="stylesheet" href="css/responsive.css">
```
