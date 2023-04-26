const menu = document.querySelector('.title');
const yosh = document.querySelector('#yosh');
const brandon = document.querySelector('#brandon');
const brus = document.querySelector('#brus');

menu.addEventListener('mouseover', (e) => {
  menu.classList.add('hovered-main');
});


yosh.addEventListener('mouseover', (e) => {
  yosh.classList.add('hovered-card');
  menu.classList.remove('no-hovered-main');
});

yosh.addEventListener('mouseleave', (e) => {
  yosh.classList.remove('hovered-card');
});

brandon.addEventListener('mouseover', (e) => {
  brandon.classList.add('hovered-card');
  menu.classList.remove('no-hovered-main');
});

brandon.addEventListener('mouseleave', (e) => {
  brandon.classList.remove('hovered-card');
});

brus.addEventListener('mouseover', (e) => {
  brus.classList.add('hovered-card');
  menu.classList.remove('no-hovered-main');
});

brus.addEventListener('mouseleave', (e) => {
  brus.classList.remove('hovered-card');
});