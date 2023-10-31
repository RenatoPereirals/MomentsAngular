import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Moments } from 'src/app/Moments';

import { MessagesService } from 'src/app/services/messages.service';
import { MomentsService } from 'src/app/services/moments.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss'],
})
export class NewMomentComponent implements OnInit {
  public btnText: string = 'Compartilhar!';

  constructor(
    private momentService: MomentsService,
    private messagesService: MessagesService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  createHandler(moment: Moments) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.creatMoment(formData).subscribe();

    this.messagesService.add('Momento adicionado com sucesso!');

    this.router.navigate(['/']);
  }
}
