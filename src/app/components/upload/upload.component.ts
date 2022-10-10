import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() small: any
  @Input() medium: any
  file = ''

  constructor() { }

  ngOnInit(): void {
  }

  readURL(event: any) {
    let files = event.target.files
    if (files && files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        this.file = e.target && e.target.result
      };
      reader.readAsDataURL(files[0]);
    }
  }
}
