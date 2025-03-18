const navbar = document.querySelector('nav');
const menuIcon = document.getElementById('menu-bar');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const navLinks = document.querySelectorAll('nav a');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navbar.classList.remove('active');
      menuIcon.classList.remove('fa-times');
    }

    navLinks.forEach((navLink) => navLink.classList.remove('active'));
    link.classList.add('active');
  });
});

const setActiveNavOnScroll = () => {
  const sections = document.querySelectorAll('section');
  let scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', setActiveNavOnScroll);
window.addEventListener('load', setActiveNavOnScroll);

const initTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  if (newTheme === 'dark') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
};

themeToggle.addEventListener('click', toggleTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  if (newTheme === 'dark') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
});

const createStarRating = (rating) => {
  let starsHTML = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHTML += '<i class="fa-solid fa-star"></i>';
    } else if (i === fullStars + 1 && hasHalfStar) {
      starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      starsHTML += '<i class="fa-regular fa-star"></i>';
    }
  }

  return starsHTML;
};

const loadMeals = async () => {
  try {
    const response = await fetch('meals.json');
    const data = await response.json();
    const mealsContainer = document.querySelector('.meal-wrapper');

    if (mealsContainer) {
      let mealsHTML = '';

      data.meals.forEach((meal) => {
        mealsHTML += `
                    <div class="meal">
                        <a href="#" class="fa-solid fa-heart meal-icon"></a>
                        <a href="#" class="fa-solid fa-eye meal-icon"></a>
                        <img src="${meal.image}" alt="${meal.name.toLowerCase()}" />
                        <h3>${meal.name}</h3>
                        <div class="stars">
                            ${createStarRating(meal.rating)}
                        </div>
                        <div class="price-card-wrapper">
                            <span class="price">$${meal.price.toFixed(2)}</span>
                            <a href="#" class="btn">add to cart</a>
                        </div>
                    </div>
                `;
      });

      mealsContainer.innerHTML = mealsHTML;
    }
  } catch (error) {
    console.error('Error loading meals:', error);
  }
};

const loadMenu = async () => {
  try {
    const response = await fetch('menu.json');
    const data = await response.json();
    const menuContainer = document.querySelector('.menu-wrapper');

    if (menuContainer) {
      let menuHTML = '';

      data.categories.forEach((category) => {
        menuHTML += `
                    <div class="menu">
                        <h5>${category.name}</h5>
                        <ul>
                            ${category.items
                              .map(
                                (item) => `
                                <li>${item.name}<b>$${item.price}</b></li>
                            `
                              )
                              .join('')}
                        </ul>
                    </div>
                `;
      });

      menuContainer.innerHTML = menuHTML;
    }
  } catch (error) {
    console.error('Error loading menu:', error);
  }
};

const loadRecipes = async () => {
  try {
    const response = await fetch('recipes.json');
    const data = await response.json();
    const recipesContainer = document.querySelector('.recipe-wrapper .recipe');

    if (recipesContainer) {
      let recipesHTML = '';

      data.recipes.forEach((recipe, index) => {
        recipesHTML += `
                    <li>
                        <input type="radio" id="${recipe.id}" name="accordion" ${index === 0 ? 'checked' : ''} />
                        <label for="${recipe.id}">${recipe.name}</label>
                        <p class="content">${recipe.ingredients}</p>
                    </li>
                `;
      });

      recipesContainer.innerHTML = recipesHTML;
    }
  } catch (error) {
    console.error('Error loading recipes:', error);
  }
};

const loadReviews = async () => {
  try {
    const response = await fetch('reviews.json');
    const data = await response.json();
    const reviewsContainer = document.querySelector('.review-wrapper');

    if (reviewsContainer) {
      let reviewsHTML = '';

      data.reviews.forEach((review) => {
        reviewsHTML += `
                    <div class="review-card">
                        <div class="customer">
                            <i class="fa-solid fa-quote-right"></i>
                            <img src="${review.image}" alt="${review.name}" />
                            <h3>${review.name}</h3>
                            <div class="stars">
                                ${createStarRating(review.rating)}
                            </div>
                        </div>
                        <p>${review.text}</p>
                    </div>
                `;
      });

      reviewsContainer.innerHTML = reviewsHTML;
    }
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
};

const initApp = () => {
  initTheme();
  loadMeals();
  loadMenu();
  loadRecipes();
  loadReviews();
};

document.addEventListener('DOMContentLoaded', initApp);
