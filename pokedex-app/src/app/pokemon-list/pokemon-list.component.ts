import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  page = 1;
  totalPokemons: number | undefined;

  constructor(
    private apiService: ApiService
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
}
