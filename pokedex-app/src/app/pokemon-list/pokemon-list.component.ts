import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  pokemonsFavs: any[] = [];
  pokemonData = {
    name: '',
    abilities: [{ability: {name: '', url: ''}}],
    sprites: {front_default: '', back_default: '', front_shiny: '', back_shiny: ''},
    game_indices: [{version: {name: '', url: ''}}]
  };
  //existeData = 0;
  page = 1;
  totalPokemons: number | undefined;
  modalPokemon: Modal | undefined;

  constructor(
    private apiService: ApiService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    
    this.getPokemons();
    //console.log(this.pokemons);
    
  }

  // Obtener Pokemons
  getPokemons(){
    this.apiService.getPokemon(100, ((this.page - 1) * 100)).subscribe(
      (res: any) => {
        this.totalPokemons = res.count;

        res.results.forEach((element: { name: string; }) => {
          this.apiService.getPokeData(element.name).subscribe(
            (uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
            }
          )
        });
      }
    )
  }

  // Abrir Modal de información
  openModal(name: string){
    this.pokemonData = {
      name: '',
      abilities: [{ability: {name: '', url: ''}}],
      sprites: {front_default: '', back_default: '', front_shiny: '', back_shiny: ''},
      game_indices: [{version: {name: '', url: ''}}]
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
    console.log(this.pokemonData);
    
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
      }
    })
  }
}
