import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {





  public imageSrc =""
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }


    //This function for upload files [image]
    onImagePicked(event: any){
      //reader => to read the uploaded file
      const reader = new FileReader();
      //check if there is file or note
      if(event.target.files && event.target.files.length) {
        //store the files in file array
        const [file] = event.target.files;
        console.log(file);

        //read the file
        reader.readAsDataURL(file);
        //after reading event
        reader.onload = () => {
          this.imageSrc = reader.result as string;  //store the image soruce
          this.authService.profileUpdate(file);
          // console.log(this.imageSrc);

        }
      }

    }

}
