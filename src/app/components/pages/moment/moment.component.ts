import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

import { Moments } from 'src/app/Moments';
import { Comment } from 'src/app/Coment';

import { enviroment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnInit {
  moment?: Moments;
  baseApiUrl = enviroment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentsServicve: MomentsService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentsServicve
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  removeHendler(id: number) {
    this.momentsServicve.removeMoment(id).subscribe();

    this.messageService.add('Momento excluído com sucesso!');

    this.router.navigate(['/']);
  }

  onSubmit(FormGroupDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
    }
    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment?.id);

    this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messageService.add('Comentário adicionado');

    //reseta o form
    this.commentForm.reset();
    FormGroupDirective.resetForm();
  }
}
