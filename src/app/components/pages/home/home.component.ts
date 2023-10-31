import { Component, OnInit } from '@angular/core';

import { MomentsService } from 'src/app/services/moments.service';

import { Moments } from 'src/app/Moments';

import { enviroment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allMoments: Moments[] = [];
  moments: Moments[] = [];
  baseApiUrl = enviroment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentsService: MomentsService) {}

  ngOnInit(): void {
    this.momentsService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = data;
      this.moments = data;
    });
  }
  
  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value);
    });
  }
}
