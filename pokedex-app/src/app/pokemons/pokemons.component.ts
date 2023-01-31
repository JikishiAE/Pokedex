import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  pokemons: any[] = [];
  page = 1;
  totalPokemons: number | undefined;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getPokemons();
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
