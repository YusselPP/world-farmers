import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapContainer: ElementRef;
  @Input() mapService: MapService;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapService.setMapContainer(this.mapContainer.nativeElement);
  }
}
