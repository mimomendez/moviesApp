import { PipesModule } from './../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper/core';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { RatingModule } from 'ng-starrating';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    RatingModule,
    PipesModule
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent
  ]
})
export class ComponentsModule { }
