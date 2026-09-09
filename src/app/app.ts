import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzIconModule],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {}