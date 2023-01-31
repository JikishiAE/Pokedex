import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component'
import { PokemonsFavComponent } from './pokemons-fav/pokemons-fav.component'

const routes: Routes = [
                          { path: '', component: PokemonsComponent },
                          { path: 'favorites', component: PokemonsFavComponent }
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
