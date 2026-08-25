/* ==================================================
   Section navigation
   ================================================== */
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

/* ==================================================
   Current date
   ================================================== */
function updateDate() {
    const dateElement = document.getElementById('current-date');
    if (!dateElement) return;
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
    const year = now.getFullYear();
    const monthName = now.toLocaleDateString('en-US', { month: 'long' });
    const dayNum = now.getDate();
    const customFormat = `${dayName}, ${year} ${monthName} ${dayNum}`;

    dateElement.textContent = customFormat;
}

/* ==================================================
   Hero background slider
   ================================================== */
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

/* ==================================================
   Hero typewriter
   ================================================== */
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
    if (!el) return;

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

/* ==================================================
   Expertise accordion
   ================================================== */
function openAccordion() {
    const accordionItems = document.querySelectorAll(".accordion-item");
    const expertiseCard = document.querySelector(".expertise");
    const BASE_SPAN = 13;
    const ROW_SIZE = 10;
    const GAP_SIZE = 24;

    function pxToSpan(px) {
        return Math.ceil(px / (ROW_SIZE + GAP_SIZE));
    }

    accordionItems.forEach(item => {
        const btn = item.querySelector(".accordion-button");
        const body = item.querySelector(".accordion-body");

        btn.setAttribute("aria-expanded", "false");

        btn.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            // Close all items first
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove("open");
                otherItem.querySelector(".accordion-button").setAttribute("aria-expanded", "false");
                otherItem.querySelector(".accordion-body").style.maxHeight = "0";
            });
            expertiseCard.style.gridRow = `span ${BASE_SPAN}`;

            if (!isOpen) {
                // Open this item
                item.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
                body.style.maxHeight = body.scrollHeight + "px";
                expertiseCard.style.gridRow = `span ${BASE_SPAN + pxToSpan(body.scrollHeight)}`;
            }
        });
    });
}

/* ==================================================
   Light and dark theme
   ================================================== */
function initThemeToggle() {
    const toggleThemeBtn = document.querySelector(".theme-toggle-button");
    if (!toggleThemeBtn) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        toggleThemeBtn.classList.add("active");
    }

    toggleThemeBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");

        toggleThemeBtn.classList.toggle("active", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

/* ==================================================
   Project cards and JSON data
   ================================================== */
function createProjectCard(project, compact = false) {
    return `
        <article class="project-card ${compact ? "project-card-compact" : ""}">
            <img
                src="${project.image}"
                alt="${project.title}"
                loading="lazy"
            >

            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>

                <div class="project-technologies">
                    ${project.technologies.map(technology =>
                        `<span>${technology}</span>`
                    ).join("")}
                </div>
            </div>
        </article>
    `;
}

const loadProjects = async () => {
    const projectList = document.querySelector(
        "#projects .project-list"
    );

    const homeProjectList = document.querySelector(
        "#home .featured-project-list"
    );

    try {
        const response = await fetch("profile-data.json");

        if (!response.ok) {
            throw new Error("Could not load projects data");
        }

        const data = await response.json();

        // All projects on the Projects page.
        if (projectList) {
            projectList.innerHTML = data.projects
                .map(project => createProjectCard(project))
                .join("");
        }

        // Only the first two projects on Home.
        if (homeProjectList) {
            homeProjectList.innerHTML = data.projects
                .slice(0, 2)
                .map(project => createProjectCard(project, true))
                .join("");
        }
    } catch (error) {
        if (projectList) {
            projectList.innerHTML =
                "<p>Projects could not be loaded.</p>";
        }

        if (homeProjectList) {
            homeProjectList.innerHTML =
                "<p>Projects could not be loaded.</p>";
        }

        console.error(error);
    }
};

function initViewAllProjects() {
    const viewAllButton = document.querySelector(".view-all-projects");
    if (!viewAllButton) return;

    viewAllButton.addEventListener("click", () => {
        document.querySelector(
            '.sidebar-menu a[href="#projects"]'
        )?.click();
    });
}

/* ==================================================
   Initialization
   ================================================== */
navSections();
updateDate();
initHeroSlider();
initTypewriter();
openAccordion();
initThemeToggle();
loadProjects();
initViewAllProjects();
