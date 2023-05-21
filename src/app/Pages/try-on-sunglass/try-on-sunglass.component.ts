import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseServiceService } from 'src/app/service/database-service.service';

@Component({
  selector: 'app-try-on-sunglass',
  templateUrl: './try-on-sunglass.component.html',
  styleUrls: ['./try-on-sunglass.component.scss']
})
export class TryOnSunglassComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DatabaseServiceService,
  ){}

  ngOnInit(): void {
    
  }

}
