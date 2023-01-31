import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsFavComponent } from './pokemons-fav.component';

describe('PokemonsFavComponent', () => {
  let component: PokemonsFavComponent;
  let fixture: ComponentFixture<PokemonsFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsFavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
