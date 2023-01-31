import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: any[] = [];
  pokemonsFavs: any[] = [];
  @Input() page = 1;
  @Input() totalPokemons: number | undefined;
  pokemonData = {
    name: '',
    abilities: [{ability: {name: '', url: ''}}],
    sprites: {front_default: '', back_default: '', front_shiny: '', back_shiny: ''},
    game_indices: [{version: {name: '', url: ''}}],
    types: [{type: {name: ''}}]
  };
  //existeData = 0;
  
  modalPokemon: Modal | undefined;

  constructor(
    private el: ElementRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    
    //console.log(this.pokemons);
    
  }

  // Abrir Modal de información
  openModal(name: string){
    this.pokemonData = {
      name: '',
      abilities: [{ability: {name: '', url: ''}}],
      sprites: {front_default: '', back_default: '', front_shiny: '', back_shiny: ''},
      game_indices: [{version: {name: '', url: ''}}],
      types: [{type: {name: ''}}]
    };
    //this.existeData = 0;

    this.pokemons.forEach((element) => {
      if(element.name == name){
        this.pokemonData = element;
      }
    })

    //this.existeData = Object.keys(this.pokemonData).length;

    var Modal = this.el.nativeElement.querySelector("#modal_Pokemon");

    if(Modal && (this.pokemonData.name != '')){
      this.modalPokemon = new bootstrap.Modal(Modal,
      {
        keyboard: false
      })

      this.modalPokemon.show();
    }

    //console.log(this.existeData);
    //console.log(this.pokemonData);
    
  }

  AgregarQuitarFav(name: string){
    var indice = -1;
    var mensaje = "";

    this.pokemonsFavs = Array.from(JSON.parse(localStorage.getItem('Favoritos') || '{}'));
    
    this.pokemons.forEach((element) => {
      if(element.name == name){

        this.pokemonsFavs.forEach((elmnt) => {
          if(elmnt.name == name){
            indice = this.pokemonsFavs.indexOf(elmnt);
            this.pokemonsFavs.splice(indice, 1);
            mensaje = "Pokémon eliminado de favoritos";
          }
        })

        // if(this.pokemonsFavs.find(element.name) != undefined){
        //   indice = this.pokemonsFavs.findIndex(element.name);
        //   this.pokemonsFavs = this.pokemonsFavs.splice(indice, 1);
        // }
        // console.log(this.pokemonsFavs);

        if(indice == (-1)){
          this.pokemonsFavs.push(element);
          mensaje = "Pokémon agregado a favoritos";
        }
        
        localStorage.setItem('Favoritos', JSON.stringify(this.pokemonsFavs));

        alert(mensaje);

        if(this.router.url == "/favorites"){
          // this.router.navigateByUrl('/favorites', {skipLocationChange: true}).then(
          //   ()=> this.router.navigate(["favorites"])
          // );
          //this.router.navigate(["/favorites"]);
          location.reload();
          
        }
        
      }
    })
  }
}
