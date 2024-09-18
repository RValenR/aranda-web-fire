import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { addDoc, collection, collectionData, Firestore, getFirestore } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface Item {
  code: string,
  state: string,
  food: string,
  arrivalDate: string,
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public allImages: string[] = [];
  public items: any;
  public jsonItems:any;

  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) { }

  addElement(element: any) {
    const elementRef = collection(this.firestore, 'plants')
    return addDoc(elementRef, element)
  }

  getElements(): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      // Inicializar Firebase
      const app = initializeApp(environment.firebaseConfig);
  
      // Inicializar Firestore y obtener referencia al servicio
      const db = getFirestore(app);
      const itemCollection = collection(db, "plants");
  
      // Obtener los datos como observable
      this.items = collectionData(itemCollection) as Observable<Item[]>;
  
      // Suscribirse al observable
      this.items.subscribe(
        (items: Item[]) => {
          // Convertir los datos en un objeto JSON
          // const jsonItems = JSON.stringify(items);
          console.log('ITEMS en formato JSON:', items);
  
          // Resolver la promesa con el JSON
          resolve(items);
        },
        (error: any) => {
          console.error('Error al obtener los elementos:', error);
          reject(error);  // Rechazar la promesa en caso de error
        }
      );
    });
  }

  uploadFile(file: File) {
    const imaRef = ref(this.storage, `imagenes/${file.name}`)
    uploadBytes(imaRef, file)
      .then(response => {
        console.log(response);
        return getDownloadURL(imaRef)
      })
      .then(downloadURL => {
        console.log('File available at', downloadURL);
      })
      .catch(error => console.log(error))
  }

  uploadAllData(file: File, dataForm: any) {
    const imaRef = ref(this.storage, `imagenes/${file.name}`)
    uploadBytes(imaRef, file)
      .then(response => {
        console.log(response);
        return getDownloadURL(imaRef)
      })
      .then(downloadURL => {
        console.log('File available at', downloadURL);
        const allData = {
          code: dataForm.code,
          state: dataForm.state,
          food: dataForm.food,
          arrivalDate: dataForm.arrivalDate,
          url: downloadURL
        }

        this.addElement(allData);
      })
      .catch(error => console.log(error))
  }

  getImages() {
    const imgRef = ref(this.storage, 'imagenes');
    listAll(imgRef)
      .then(response => {
        console.log(response)
        response.items.forEach(async element => {
          const url = await getDownloadURL(element);
          // console.log(url);
          this.allImages.push(url);
          console.log(this.allImages)
        })
        return this.allImages;
      })
      .catch(error => console.log(error))
  }
}
