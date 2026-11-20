const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')})}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('form[data-demo-form]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const message=form.querySelector('.form-message');
    if(message) message.textContent='Thank you! This demo form is ready to be connected to your backend.';
    form.reset();
  });
});
