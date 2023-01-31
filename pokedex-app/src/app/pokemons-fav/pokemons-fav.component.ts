import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemons-fav',
  templateUrl: './pokemons-fav.component.html',
  styleUrls: ['./pokemons-fav.component.css']
})
export class PokemonsFavComponent implements OnInit {

  pokemons: any[] = [];
  page = 1;
  totalPokemons: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(){
    this.pokemons = Array.from(JSON.parse(localStorage.getItem('Favoritos') || '{}'));

    this.totalPokemons = this.pokemons.length;
  }

}
