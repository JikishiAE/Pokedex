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
  pokemonData = {
    name: '',
    abilities: [{ability: {name: ''}}]
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
      abilities: [{ability: {name: ''}}]
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
}
