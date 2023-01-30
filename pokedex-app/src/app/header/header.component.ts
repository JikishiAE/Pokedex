import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  scrolled: boolean = false;
  osc_bla: boolean = true; 

  constructor(private el: ElementRef) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 0;
  }

  ngOnInit(): void {
  }

  cambiarFondo(){
    this.osc_bla = !this.osc_bla;
    var body = document.body;    

    if(this.osc_bla){
      body.classList.remove("modoClaro")
      body.classList.add("modoOscuro");
    }
    else{
      body.classList.remove("modoOscuro")
      body.classList.add("modoClaro");
    }
  }

  abrirMenu(){
    let myTag = this.el.nativeElement.querySelector("#menu_movil");
    let myNav = this.el.nativeElement.querySelector("#linksMenu");

    if(!myTag.classList.contains('active'))
    {
      myTag.classList.add('active'); 
      myNav.classList.add('active'); 
    }
    else{
      myTag.classList.remove('active'); 
      myNav.classList.remove('active'); 
    }
  }

}
