import GalleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxButton: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

function CreateGalleryItems() {
  const arr = [];

  const elemLi = document.createElement('li');
  const elemA = document.createElement('a');
  const elemImg = document.createElement('img');

  elemA.append(elemImg);
  elemLi.append(elemA);

  elemLi.classList.add('gallery__item');
  elemA.classList.add('gallery__link');
  elemImg.classList.add('gallery__image');

  GalleryItems.forEach(item => {
    elemA.href = item.original;
    elemImg.src = item.preview;
    elemImg.alt = item.description;
    elemImg.dataset.source = item.original;
    arr.push(elemLi.outerHTML);
  });
  return arr.join('');
}
refs.gallery.insertAdjacentHTML('afterbegin', CreateGalleryItems());

// is-open

refs.gallery.addEventListener('click', openLightbox);

function openLightbox(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const target = event.target;
  const imgSrc = target.dataset.source;

  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = imgSrc;
}

// Close

refs.lightboxButton.addEventListener('click', closeLightbox);
window.addEventListener('keydown', onPressEscape);
refs.lightbox.addEventListener('click', closeLightbox);

function closeLightbox() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    closeLightbox();
  }
}

