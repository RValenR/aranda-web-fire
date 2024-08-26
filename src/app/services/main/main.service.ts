import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { addDoc, collection, collectionData, Firestore, getFirestore} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface Item {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public allImages: string[] = [];
  public items: any;

  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) { }

  addElement(element: any){
    const elementRef = collection(this.firestore, 'places')
    return addDoc(elementRef, element)
  }

  getElements(){
     // Initialize Firebase
     const app = initializeApp(environment.firebaseConfig);
     // Initialize Cloud Firestore and get a reference to the service
     const db = getFirestore(app);
     const itemCollection = collection(db, "places");
     this.items = collectionData(itemCollection) as Observable<Item[]>
  }

  uploadFile(file: File){
    const imaRef = ref(this.storage, `imagenes/${file.name}`)
    uploadBytes(imaRef, file)
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  getImages(){
    const imgRef = ref(this.storage, 'imagenes');
    listAll(imgRef)
    .then(response => {
      console.log(response)
      response.items.forEach(async element=>{
        const url = await getDownloadURL(element);
        // console.log(url);
        this.allImages.push(url);
        console.log(this.allImages)
      })
      return this.allImages;
    })
    .catch(error=> console.log(error))
  }
}
