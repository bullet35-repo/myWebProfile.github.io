function navSections() {
    const navLinks = document.querySelectorAll(".sidebar-menu a");
    const sections = document.querySelectorAll("main section");

    function showSection(id) {
        // hide all sections
        sections.forEach(sec => sec.classList.remove("active"));
        // remove active from links
        navLinks.forEach(link => link.classList.remove("active"));

        // show target section
        const targetSection = document.querySelector(id);
        if (targetSection) targetSection.classList.add("active");

        // set active link
        const activeLink = document.querySelector(`.sidebar-menu a[href="${id}"]`);
        if (activeLink) activeLink.classList.add("active");
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // stop default jump
            const id = link.getAttribute("href"); // like "#about"
            showSection(id);

            // optional: update URL hash without jump
            history.pushState(null, "", id);
        });
    });

    // If user reloads with a hash like /#projects
    window.addEventListener("DOMContentLoaded", () => {
        const id = window.location.hash || "#home";
        showSection(id);
    });
}
navSections();
function updateDate() {
    const dateElement = document.getElementById('current-date');
    if (!dateElement) return;
    const now = new Date();

    // We can configure exactly how we want the date to look!
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Formats it like "Wed, February 25, 2026"
    const formattedDate = now.toLocaleDateString('en-US', options);

    // Small tweak to match your reference image format exactly: "Wed, 2026 February 25"
    // (Optional: If you prefer the standard format above, just use formattedDate instead)
    const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
    const year = now.getFullYear();
    const monthName = now.toLocaleDateString('en-US', { month: 'long' });
    const dayNum = now.getDate();

    const customFormat = `${dayName}, ${year} ${monthName} ${dayNum}`;

    // Update the text in the HTML
    dateElement.textContent = customFormat;
}
// Run it immediately when the script loads
updateDate();

function initHeroSlider() {
    const heroCard = document.getElementById('hero-bg-card');
    if (!heroCard) return;
    // IMPORTANT: You need to replace these filenames with the actual images 
    // you want to use. Put your images in your "assets" folder!
    const images = [
        'assets/webdev.jpg', // Image 1
        'assets/sofware.jpeg', // Image 2
        'assets/management.jpg'  // Image 3
    ];
    let currentIndex = 0;
    // Function to change the background
    function changeBackground() {
        // Apply the current image from the array
        heroCard.style.backgroundImage = `url("${images[currentIndex]}")`;

        // Move to the next index. If we reach the end, go back to 0.
        currentIndex = (currentIndex + 1) % images.length;
    }
    // Set the first image immediately so it's not empty
    changeBackground();
    // Call the changeBackground function every 5000 milliseconds (5 seconds)
    setInterval(changeBackground, 5000);
}
// Run the slider initialization
initHeroSlider();

function initTypewriter() {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) {
        greeting = "Good morning!";
    } else if (hour < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }
    const texts = [
        greeting,
        "Got a project in mind? Let's chat!",
        "I build clean UI and fast websites.",
        "Need a portfolio site? I can help."
    ];

    const el = document.getElementById("typewriter");

    let textIndex = 0;
    let charIndex = 0;

    const typingSpeed = 60;
    const backspaceSpeed = 40;
    const waitAfterTyped = 5000; // 5 seconds
    const waitAfterErased = 500; // small pause before next

    function type() {
        const currentText = texts[textIndex];

        if (charIndex < currentText.length) {
            el.textContent += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // done typing, wait 5s then erase
            setTimeout(erase, waitAfterTyped);
        }
    }

    function erase() {
        if (charIndex > 0) {
            el.textContent = el.textContent.slice(0, -1);
            charIndex--;
            setTimeout(erase, backspaceSpeed);
        } else {
            // move to next text
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, waitAfterErased);
        }
    }

    // Start after DOM loads (safe)
    document.addEventListener("DOMContentLoaded", type);
}
initTypewriter();
function openAccordion() {
    const accordionItems = document.querySelectorAll(".accordion-item");
    const expertiseCard = document.querySelector(".expertise");

    const BASE_SPAN = 13;  // Must match your CSS grid-row: span 13
    const ROW_SIZE = 10;   // grid-auto-rows: 10px
    const GAP_SIZE = 24;   // gap: 1.5rem = 24px

    // Converts pixel height to grid row spans (accounts for gaps between rows)
    function pxToSpan(px) {
        return Math.ceil((px + GAP_SIZE) / (ROW_SIZE + GAP_SIZE));
    }

    accordionItems.forEach(item => {
        const btn = item.querySelector(".accordion-button");
        const body = item.querySelector(".accordion-body");

        btn.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            // Close all items first
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove("open");
                otherItem.querySelector(".accordion-body").style.maxHeight = null;
            });

            if (!isOpen) {
                // Open this item
                item.classList.add("open");
                body.style.maxHeight = body.scrollHeight + "px";

                // Grow the card by exactly the body height
                const extraSpan = pxToSpan(body.scrollHeight);
                expertiseCard.style.gridRow = `span ${BASE_SPAN + extraSpan}`;
            } else {
                // Restore to base size
                expertiseCard.style.gridRow = `span ${BASE_SPAN}`;
            }
        });
    });
}
openAccordion();
