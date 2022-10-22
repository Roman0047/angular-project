import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilesRepository} from "../../repository/files";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() small: any
  @Input() medium: any
  @Input() file: any
  @Input() error: any
  @Input() disabled: any
  @Output() upload = new EventEmitter<any>();

  constructor(private filesRepo: FilesRepository) { }

  apiUrl = environment.apiUrl

  async uploadFile(event: any) {
    let data = new FormData()
    data.append(`file`, event.target.files[0])
    const file = await this.filesRepo.upload(data)
    this.upload.emit(file.path);
  }

  ngOnInit(): void {
  }

  get fileType() {
    if (this.file) {
      const format = this.file.split('.').pop()
      const videoFormats = ['mp4', 'mov', 'avi', 'flv', 'mkv', 'wmv', 'avchd', 'webm']
      return videoFormats.find(item => item == format) ? 'video' : 'image'
    } else {
      return "image"
    }
  }
}
