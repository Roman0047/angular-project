import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilesRepository} from "../../repository/files";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() small: any
  @Input() medium: any
  @Output() upload = new EventEmitter<any>();
  file = ''

  constructor(private filesRepo: FilesRepository) { }

  ngOnInit(): void {
  }

  async readURL(event: any) {
    let files = event.target.files
    if (files && files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        this.file = e.target && e.target.result
      };
      reader.readAsDataURL(files[0]);
    }

    let data = new FormData()
    data.append(`file`, files[0])
    const file = await this.filesRepo.upload(data)
    console.log(file)
  }
}
