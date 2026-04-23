// Componentes reutilizables para FUNINTEC
// Uso: <div id="site-footer"></div> + <script src="components.js"></script>

function loadFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  el.innerHTML = `
  <footer class="footer">
    <div class="footer__top">
      <div class="container text-center">
        <div class="row">
          <div class="col-12">
            <h2 class="footer__heading">
              <strong>EMPRENDEDORES<br>Te acompañamos</strong>
            </h2>
            <a href="contacto.html" class="footer__btn">
              Contactanos
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container text-center">
        <p class="footer__copy">
          Copyright ${new Date().getFullYear()} | Funintec | Universidad Nacional de San Martin
        </p>
      </div>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', function() {
  loadFooter();
});
