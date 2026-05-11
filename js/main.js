// NAV scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));

// Hamburger
const ham=document.getElementById('ham');
const mob=document.getElementById('mobMenu');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mob.classList.toggle('open')});
function closeMob(){ham.classList.remove('open');mob.classList.remove('open')}

// Cerrar menú al hacer click fuera
document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!mob.contains(e.target))closeMob()});

// Solo letras nombre
document.getElementById('nombre').addEventListener('input',function(){
  this.value=this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g,'');
});
// Solo números teléfono
document.getElementById('tel').addEventListener('input',function(){
  this.value=this.value.replace(/\D/g,'').slice(0,9);
});

// Reveal on scroll
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}});
},{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// Formulario
document.getElementById('cForm').addEventListener('submit',function(e){
  e.preventDefault();
  const nombre=document.getElementById('nombre').value.trim();
  const tel=document.getElementById('tel').value.trim();
  const email=document.getElementById('email').value.trim();
  const servicio=document.getElementById('servicio').value;
  const mensaje=document.getElementById('mensaje').value.trim();
  let ok=true;

  function chk(id,valid){
    document.getElementById(id).classList.toggle('er',!valid);
    const em=document.getElementById('e-'+id);
    if(em)em.classList.toggle('show',!valid);
    if(!valid)ok=false;
  }
  chk('nombre',/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,}$/.test(nombre));
  chk('tel',/^\d{9}$/.test(tel));
  chk('email',/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email));
  chk('servicio',servicio!=='');
  chk('mensaje',mensaje.length>=10);

  if(ok){
    const body=`Nombre: ${nombre}\nTeléfono: +56${tel}\nCorreo: ${email}\nServicio: ${servicio}\n\nMensaje:\n${mensaje}`;
    window.location.href=`mailto:transpedroemiliano@gmail.com?subject=${encodeURIComponent('Cotización - '+nombre)}&body=${encodeURIComponent(body)}`;
    document.getElementById('fWrap').style.display='none';
    document.getElementById('fOk').classList.add('show');
  }
});