import {Component, Input, input} from '@angular/core';
import {Profile} from "../../data/intefraces/profile.interface";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {

  // Старый подход
  // ! Точно будет передан
  @Input() profile!: Profile;
}
