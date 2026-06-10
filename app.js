/* ============================================================
   BeyondBalance — interactions
   ============================================================ */
(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); });
    });
  }

  /* ---------- header scrolled + scroll progress ---------- */
  var header = document.querySelector('header');
  var progress = document.querySelector('.progress');
  function onScroll(){
    var y = window.scrollY || window.pageYOffset;
    if(header) header.classList.toggle('scrolled', y > 8);
    if(progress){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- reveals ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.14, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('nav a[href^="#"]'))
    .filter(function(a){ return !a.classList.contains('btn'); });
  var linkMap = {};
  navLinks.forEach(function(a){ linkMap[a.getAttribute('href').slice(1)] = a; });
  var sectionIds = Object.keys(linkMap).filter(function(id){ return document.getElementById(id); });
  if(sectionIds.length){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          navLinks.forEach(function(a){ a.classList.remove('active'); });
          var l = linkMap[e.target.id];
          if(l) l.classList.add('active');
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    sectionIds.forEach(function(id){ spy.observe(document.getElementById(id)); });
  }

  /* ---------- hero forecast chart: measure + draw ---------- */
  var growth = document.getElementById('growthPath');
  var dot = document.getElementById('growthDot');
  if(growth){
    try{
      var len = growth.getTotalLength();
      growth.style.setProperty('--len', len);
    }catch(e){}
    if(reduce){
      growth.classList.add('drawn'); if(dot) dot.classList.add('drawn');
    } else {
      // draw shortly after load so the transition is visible
      requestAnimationFrame(function(){
        setTimeout(function(){
          growth.classList.add('drawn');
          if(dot) dot.classList.add('drawn');
        }, 280);
      });
    }
  }

  /* ---------- journey: scroll-tied line draw + staged reveal ---------- */
  var jGrid = document.getElementById('journeyGrid');
  var jPath = document.getElementById('jPath');
  var stages = document.querySelectorAll('.stage');
  var jdots = document.querySelectorAll('.jdot');
  function journeyProgress(){
    if(!jGrid || !jPath) return;
    var r = jGrid.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)));
    jPath.style.strokeDashoffset = 1 - p;
    stages.forEach(function(s, i){
      var lit = p > (i + 0.5) / stages.length;
      s.classList.toggle('on', lit || reduce);
      if(jdots[i]) jdots[i].classList.toggle('lit', lit || reduce);
    });
  }
  window.addEventListener('scroll', journeyProgress, {passive:true});
  window.addEventListener('resize', journeyProgress);
  journeyProgress();

  /* ---------- consultation modal ---------- */
  var back = document.getElementById('consultModal');
  var modalBody = document.getElementById('modalBody');
  var lastFocus = null;
  var formHTML = modalBody ? modalBody.innerHTML : '';

  function openModal(intent){
    if(!back) return;
    lastFocus = document.activeElement;
    if(modalBody && modalBody.dataset.state === 'success'){
      modalBody.innerHTML = formHTML;
      modalBody.dataset.state = 'form';
      wireForm();
    }
    var sel = back.querySelector('#intent');
    if(sel && intent){ sel.value = intent; }
    back.classList.add('open');
    back.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    var first = back.querySelector('input, select, textarea, button.close');
    if(first) setTimeout(function(){ first.focus(); }, 60);
  }
  function closeModal(){
    if(!back) return;
    back.classList.remove('open');
    back.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(lastFocus) lastFocus.focus();
  }
  window.openConsult = openModal;

  document.querySelectorAll('[data-consult]').forEach(function(el){
    el.addEventListener('click', function(ev){
      ev.preventDefault();
      openModal(el.getAttribute('data-intent') || '');
    });
  });
  if(back){
    back.addEventListener('click', function(e){ if(e.target === back) closeModal(); });
    back.querySelector('.close').addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && back.classList.contains('open')) closeModal();
    });
  }

  function wireForm(){
    var form = document.getElementById('consultForm');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var valid = true;
      ['name','email','revenue'].forEach(function(id){
        var f = form.querySelector('#' + id);
        var field = f.closest('.field');
        var ok = f.value.trim() !== '' && (id !== 'email' || /.+@.+\..+/.test(f.value));
        field.classList.toggle('err', !ok);
        if(!ok) valid = false;
      });
      if(!valid) return;
      var name = (form.querySelector('#name').value || '').trim().split(' ')[0];
      modalBody.dataset.state = 'success';
      modalBody.innerHTML =
        '<div class="modal-success">' +
          '<div class="check"><svg width="30" height="30" viewBox="0 0 30 30"><path d="M7 15.5l5 5L23 9" fill="none" stroke="#2E8B5F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
          '<span class="eyebrow center">Request received</span>' +
          '<h3>Thanks' + (name ? ', ' + escapeHtml(name) : '') + '.</h3>' +
          '<p>We will reach out within one business day to schedule your consultation. Clarity creates confidence.</p>' +
          '<button class="btn btn-primary submit" type="button" onclick="document.getElementById(\'consultModal\').classList.remove(\'open\');document.body.style.overflow=\'\';">Done</button>' +
        '</div>';
    });
    form.querySelectorAll('input,select').forEach(function(f){
      f.addEventListener('input', function(){ f.closest('.field').classList.remove('err'); });
    });
  }
  function escapeHtml(s){ return s.replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }
  wireForm();
})();
