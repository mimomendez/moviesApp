import { Cast, CreditsResponse } from './../interfaces/credits-response';
import { MovieDetails } from './../interfaces/movie-response';
import { CarteleraResponse, Movie } from './../interfaces/cartelera-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http:HttpClient ) { }

  get params() {
    return {
      api_key: '0bf903fea1b059e57ec1ec2eca78c8a3',
      languague: 'es-US',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage = () => {
    this.carteleraPage = 1;
  }

  getCartelera = ():Observable<Movie[]> => {
    if (this.cargando){
      return of([]);
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params
      }).pipe(
        map( (resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );      
  };

  buscarPelicula = (texto: string):Observable<Movie[]> => {
    const params = {...this.params, page: '1', query: texto};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results)
    );
  };

  getPeliculaDetalle = (id: string) => {
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    );
  };

  getCast = (id: string):Observable<Cast[]> => {
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of([]))
    );
  };
}
