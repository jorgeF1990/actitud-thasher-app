import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  CollectionReference
} from '@angular/fire/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseStorage,
  Storage
} from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  rol: string;
}


export interface Producto {
  id?: string;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagenes?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private storage: FirebaseStorage = inject(Storage); // ✅ CORRECTO

  constructor() {}

  // ✅ Este método debe estar dentro de la clase
  getUsuarios(): Observable<Usuario[]> {
    const usuariosRef = collection(this.firestore, 'usuarios') as CollectionReference<Usuario>;
    return collectionData(usuariosRef, { idField: 'id' });
  }

  getProductos(): Observable<Producto[]> {
    const productosRef = collection(this.firestore, 'productos') as CollectionReference<Producto>;
    return collectionData(productosRef, { idField: 'id' });
  }

  agregarProducto(producto: Producto): Promise<void> {
    const id = doc(collection(this.firestore, 'productos')).id;
    const productoRef = doc(this.firestore, `productos/${id}`);
    return setDoc(productoRef, { ...producto, id });
  }

  actualizarProducto(id: string, producto: Producto): Promise<void> {
    const productoRef = doc(this.firestore, `productos/${id}`);
    return updateDoc(productoRef, { ...producto });
  }

  eliminarProducto(id: string): Promise<void> {
    const productoRef = doc(this.firestore, `productos/${id}`);
    return deleteDoc(productoRef);
  }

  async subirImagenes(files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const id = uuidv4();
      const filePath = `productos/${id}.png`;
      const storageRef = ref(this.storage, filePath);

      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      urls.push(url);
    }

    return urls;
  }
}

