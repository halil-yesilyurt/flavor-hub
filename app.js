const navbar = document.querySelector("nav");
const menuIcon = document.getElementById("menu-bar");

menuIcon.onclick = () => { 
    menuIcon.classList.toggle("fa-times");
    navbar.classList.toggle("active");
}

const initTheme = () => {
    const darkModeStored = localStorage.getItem('darkMode');
    if (darkModeStored === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const icon = themeToggle.querySelector('i');
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('darkMode', newTheme === 'dark');
    
    if (newTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
};

const themeToggle = document.createElement('div');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.addEventListener('click', toggleTheme);
document.body.appendChild(themeToggle);

initTheme();