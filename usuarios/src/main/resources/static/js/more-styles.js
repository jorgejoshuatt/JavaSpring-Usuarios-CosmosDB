const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');


inputs.forEach( input => {
  input.addEventListener('focus', e => {
    const labelValue = e.target.attributes.name.value;
    const label = document.querySelector(`[for=${labelValue}]`);
    label.classList.add('label-active');
  });

  input.addEventListener('focusout', e => {
    const labelValue = e.target.attributes.name.value;
    const label = document.querySelector(`[for=${labelValue}]`);
    label.classList.remove('label-active');
  });
});
