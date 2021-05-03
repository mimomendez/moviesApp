import { Movie } from './../../interfaces/cartelera-response';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Swiper } from 'swiper/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[] | undefined;

  public swiper: Swiper | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,    
    });
  }

  ngOnInit(): void {
  }

  onSlidePrev = () => {
    this.swiper?.slideNext();
  }
  onSlideNext = () => {
    this.swiper?.slideNext();
  }
}
