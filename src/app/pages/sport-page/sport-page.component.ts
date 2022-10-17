import {Component, OnInit} from '@angular/core';
import {SportsRepository} from "../../repository/sports";
import {GlobalService} from "../../global.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sport-page',
  templateUrl: './sport-page.component.html',
  styleUrls: ['./sport-page.component.scss']
})
export class SportPageComponent implements OnInit {
  constructor(
    private sportsRepo: SportsRepository,
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  isLoaded = false

  displayedColumns = ['image', 'name', 'description', 'id'];

  sport: any = {
    image: '',
    name: '',
    description: ''
  }
  sportErrors: any = {}

  tricks = [
    {
      image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
      name: 'Hydrogen',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto exercitationem iure laudantium',
      id: 1
    },
    {
      image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
      name: 'Helium',
      description: 'test',
      id: 2
    },
  ];

   async saveSport() {
    try {
      this.sport = await this.sportsRepo.create(this.sport)
      await this.router.navigate(['/sport', this.sport.id])
      this.sportErrors = {}
      this.globalService.toast('Saved')
    } catch (error: any) {
      this.sportErrors = this.globalService.getValidationErrors(error);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (parseInt(<string>id) !== 0) {
        try {
          this.sport = await this.sportsRepo.get(params.get('id'));
        } catch (error) {
          this.router.navigate(['/404'])
        }
        this.isLoaded = true
      } else {
        this.isLoaded = true
      }
    })
  }

}
