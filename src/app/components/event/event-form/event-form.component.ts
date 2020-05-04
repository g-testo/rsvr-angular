import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  model = new Event();
  isCreate: boolean;

  constructor(private eventService: EventService, location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['eventId'];
      this.isCreate = !id;
      if(!this.isCreate){
        this.eventService.getEvent(id).subscribe((event: Event)=>{
          this.model = event;
        })
      }
    })
  }

  onCreateSubmit(){
    this.eventService.postEvent(this.model).subscribe(() => {
      location.assign("/events/list");
    });
  }

  onUpdateSubmit(){
    this.eventService.putEvent(this.model).subscribe(() => {
      location.assign("/events/list");
    });
  }
}
