import { Cast } from './../../interfaces/credits-response';
import { MovieDetails } from './../../interfaces/movie-response';
import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula!: MovieDetails;
  public totalstar: number = 10;
  public ratingEditable: boolean = true;
  public cast: Cast[] = [];

  constructor( private activatexroute: ActivatedRoute, 
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router) {}

  ngOnInit(): void {
    const {id} = this.activatexroute.snapshot.params;

    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),      
      this.peliculasService.getCast( id )
    ]).subscribe( ([movie, cast]) => {
      if (!movie){
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = movie;
      this.cast = cast.filter( actor => actor.profile_path != null);
    })

    // CODE BELOW WAS REPLACE BY "combineLatest"

    // this.peliculasService.getPeliculaDetalle(id).subscribe( (movie:any) => {
    //   if (!movie){
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.pelicula = movie;
    // });
        
    // this.peliculasService.getCast( id ).subscribe( cast => {
    //   this.cast = cast.filter( actor => actor.profile_path != null);
    // });
  }

  onRegresar = () => {
    this.location.back();
  }

}
