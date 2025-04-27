import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  agregarProducto(data: any) {
    const id = uuidv4();
    return this.firestore.collection('productos').doc(id).set({ id, ...data });
  }

  obtenerProductos(): Observable<any[]> {
    return this.firestore.collection('productos').valueChanges();
  }

  actualizarProducto(id: string, data: any) {
    return this.firestore.collection('productos').doc(id).update(data);
  }

  eliminarProducto(id: string) {
    return this.firestore.collection('productos').doc(id).delete();
  }

  subirImagenes(imagenes: File[]): Promise<string[]> {
    const uploadPromises = imagenes.map((imagen) => {
      const path = `productos/${uuidv4()}_${imagen.name}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, imagen);
      return task.snapshotChanges().toPromise().then(() =>
        ref.getDownloadURL().toPromise()
      );
    });
    return Promise.all(uploadPromises);
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';