import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './styles/main.scss'
import Swiper from 'swiper'
import { Pagination, Navigation } from 'swiper/modules'

document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.querySelector('.product__image')
  const priceEl = document.querySelector('.product__price')
  const allThumbs = document.querySelectorAll('.product__thumb')
  const form = document.getElementById('contactForm')
  const allProductSizeButtons = document.querySelectorAll('.product__size')
  const popup = document.querySelector('.popup')
  const popupClose = document.querySelector('.popup__close')
  const popupForm = document.getElementById('popupForm')
  const menuBurger = document.querySelector('.menu__burger')
  const menuLogo = document.querySelector('.menu__logo')
  const menuList = document.querySelector('.menu__list')
  const footerGroups = document.querySelectorAll('.footer__group')

  const heroSlider = new Swiper('.hero__slider', {
    modules: [Pagination],
    loop: true,

    pagination: {
      el: '.hero__slider-pagination',
      clickable: true,
    },
  })

  const futureCollectionSlider = new Swiper('.featured-collection__slider', {
    modules: [Navigation],
    slidesPerView: 1.1,
    spaceBetween: 16,

    navigation: {
      nextEl: '.featured-collection__slider-button--next',
      prevEl: '.featured-collection__slider-button--prev',
      enabled: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 24,
        navigation: { enabled: true },
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 24,
        navigation: { enabled: true },
      },
    },
  })

  allThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const activeElement = document.querySelector(
        '.product__thumb.product__thumb--active'
      )
      activeElement?.classList.remove('product__thumb--active')
      activeElement?.setAttribute('aria-selected', false)
      thumb.classList.add('product__thumb--active')
      thumb.setAttribute('aria-selected', true)
      mainImage.src = thumb.querySelector('.product__thumb-img').src
      mainImage.alt = thumb.querySelector('.product__thumb-img').alt
    })
  })

  document.querySelectorAll('.product__color').forEach((color) => {
    color.addEventListener('click', () => {
      document
        .querySelector('.product__color.product__color--active')
        ?.classList.remove('product__color--active')
      color.classList.add('product__color--active')

      mainImage.src = color.src
      mainImage.alt = `${color.dataset.altForGroup} photo 1`
      priceEl.textContent = color.dataset.price
      allThumbs.forEach((thumb, index) => {
        const image = thumb.querySelector('.product__thumb-img')
        image.src = `public/images/products/nike_air_max_plus/color${
          color.dataset.color
        }-${index + 1}.jpg`
        image.alt = `${color.dataset.altForGroup} photo ${index + 1}`
      })
      const activeElement = document.querySelector(
        '.product__thumb.product__thumb--active'
      )
      activeElement?.classList.remove('product__thumb--active')
      activeElement?.setAttribute('aria-selected', false)
      allThumbs[0].classList.add('product__thumb--active')
      allThumbs[0].setAttribute('aria-selected', true)

      document
        .querySelector('.product__size.product__size--active')
        ?.classList.remove('product__size--active')
      allProductSizeButtons[0].classList.add('product__size--active')
    })
  })

  allProductSizeButtons.forEach((size) => {
    size.addEventListener('click', () => {
      document
        .querySelector('.product__size.product__size--active')
        ?.classList.remove('product__size--active')
      size.classList.add('product__size--active')
    })
  })
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = form.name.value.trim()
    const number = form.number.value.trim()
    const email = form.email.value.trim()
    const message = form.message.value.trim()

    if (!name || !number || !email || !message) {
      alert('Please fill in all fields!')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address!')
      return
    }

    alert('Thank you!')
    form.reset()
  })

  if (!localStorage.getItem('popupClosed')) {
    setTimeout(() => {
      popup.classList.add('popup--active')
      document.body.style.overflow = 'hidden'
    }, 1000)
  }

  function closePopup() {
    popup.classList.remove('popup--active')
    localStorage.setItem('popupClosed', 'true')
    document.body.style.overflow = ''
  }

  popupClose.addEventListener('click', closePopup)

  popupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Thank you!')
    popupForm.reset()
    closePopup()
  })

  menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('menu__burger--active')
    menuLogo.classList.toggle('menu__logo--active')
    menuList.classList.toggle('menu__list--active')
    const expanded = menuBurger.getAttribute('aria-expanded') === 'true'
    menuBurger.setAttribute('aria-expanded', !expanded)
  })

  function buildFooter() {
    const isMobile = window.matchMedia('(max-width: 768px)')
    if (isMobile) {
      footerGroups.forEach((group) => {
        group
          .querySelector('.footer__group-name')
          .addEventListener('click', () => {
            handleFooterNameClick(group)
          })
      })
    }
  }

  function handleFooterNameClick(group) {
    group
      .querySelector('.footer__list')
      .classList.toggle('footer__list--active')
    group
      .querySelector('.footer__group-name')
      .classList.toggle('footer__group-name--active')
  }

  buildFooter()
})
