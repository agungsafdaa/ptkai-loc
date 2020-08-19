class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     
       <section class="navigation">
      <div class="nav-container">
        <div class="brand">
          <a href="#!"><img class="logo" src="img/kai.png" /></a>
        </div>
        <nav>
          <div class="nav-mobile">
            <a id="nav-toggle" href="#!"><span></span></a>
          </div>
          <ul class="nav-list" id="list">
          
          </ul>
        </nav>
      </div>
    </section>

   `;
  }
}

customElements.define("nav-bar", NavBar);
