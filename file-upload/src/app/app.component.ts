import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'test-file-upload';


  public files: any;
  public name: any;

  constructor(private http: HttpClient)
  {

  }


  fileChange(element: any)
  {
    this.files = element.target.files;
  }

  upload()
  {
    let formData = new FormData();
    formData.append("name", this.name)
    for (var i = 0; i < this.files.length; i++) {
      formData.append("uploads", this.files[i], this.files[i].name);
    }
    console.log(formData);
    
    this.http.post('http://localhost:3000/api/upload', formData)
      .subscribe((response: any) =>
      {
        console.log('response received is ', response);
      })
  }

}
