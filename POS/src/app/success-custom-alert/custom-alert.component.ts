import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent {
  @Input() message!: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  
  dismiss() {
    this.modalController.dismiss();
  }

}
