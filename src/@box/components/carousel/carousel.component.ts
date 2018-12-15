import { Component, OnInit, Input,Output, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { startWith, switchMap, take, map } from 'rxjs/operators';
import { NguCarousel, NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { slider } from './carousel.animation';

@Component({
    selector: 'carousel-slider',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [slider],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarouselComponent implements OnInit {
    @Input() products;
    @ViewChild('prev') prevButton: ElementRef;
    @ViewChild('next') nextButton: ElementRef;

    public carouselTileConfig: NguCarouselConfig = {
        grid: { xs: 2, sm: 2, md: 3, lg: 6, all: 0 },
        speed: 250,
        point: {
            visible: false
        },
        touch: true,
        loop: false,
        interval: { timing: 1500 },
        animation: 'lazy'
    };

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
    }

    onPrevious(event){
        let prev = this.prevButton.nativeElement;
        prev.click();
    }

    onNext(event){
        let next = this.nextButton.nativeElement;
        next.click();
    }
}