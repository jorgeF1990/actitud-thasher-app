import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService, Producto, Usuario } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  seccionActiva: string | null = null;

  usuarios: Usuario[] = [];
  productos: Producto[] = [];
  producto: Producto = this.limpiarProducto();

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.seccionActiva = 'productos';
    this.cargarUsuarios();
    this.cargarProductos();
  }

  mostrarSeccion(seccion: string): void {
    this.seccionActiva = this.seccionActiva === seccion ? null : seccion;
  }

  cargarUsuarios(): void {
    this.firebaseService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  cargarProductos(): void {
    this.firebaseService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  guardarProducto(): void {
    if (this.producto.id) {
      this.firebaseService.actualizarProducto(this.producto.id, this.producto).then(() => {
        this.producto = this.limpiarProducto();
        this.cargarProductos();
      });
    } else {
      this.firebaseService.agregarProducto(this.producto).then(() => {
        this.producto = this.limpiarProducto();
        this.cargarProductos();
      });
    }
  }

  editarProducto(p: Producto): void {
    this.producto = { ...p };
  }

  eliminarProducto(id: string | undefined): void {
    if (!id) return;
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.firebaseService.eliminarProducto(id).then(() => {
        this.cargarProductos();
      });
    }
  }

  limpiarProducto(): Producto {
    return {
      nombre: '',
      precio: 0,
      descripcion: ''
    };
  }
}
