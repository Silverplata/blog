import { Component, OnInit, ViewChild } from '@angular/core';
import { IBlog } from '../../interfaces/iblog.interface';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  imports: [FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  // Referencia al formulario
  @ViewChild('blogForm') blogForm!: NgForm;

  // Propiedades del componente
  noticias: IBlog[] = [];
  nuevaNoticia: IBlog = {
    id: 1,
    title: '',
    image: '',
    description: '',
    date: new Date()
  };

  ngOnInit(): void {
    this.inicializarNoticias();
  }

  private inicializarNoticias(): void {
    this.noticias = [
      {
        id: 1,
        title: 'Chamonix-Mont-Blanc, Francia',
        image: 'https://www.iloveski.org/wp-content/uploads/2019/06/chamonix-2-1.jpg',
        description: 'Es una ruta de esquí de montaña famosa que atraviesa los Alpes...',
        date: new Date()
      },
      {
        id: 2,
        title: 'Aspen Snowmass, Colorado, Estados Unidos',
        image: 'https://www.iloveski.org/wp-content/uploads/2019/06/aspen-ski.jpg',
        description: 'Compuesta por cuatro áreas principales (Aspen Mountain, Snowmass...',
        date: new Date()
      }
    ];
  }

  agregarNoticia(form: NgForm) {
    if (this.validarCampos()) {
      const nuevoId = this.noticias.length > 0 
                     ? Math.max(...this.noticias.map(n => n.id)) + 1 
                     : 1;
      
      this.noticias.push({
        ...this.nuevaNoticia,
        id: nuevoId,
        date: new Date()
      });

      this.resetFormulario(form);
    }
  }

  async eliminarNoticia(id: number) {
    const noticiaAEliminar = this.noticias.find(n => n.id === id);
    
    const result = await Swal.fire({
      title: '¿Eliminar noticia?',
      html: `¿Estás seguro de querer eliminar la publicación <strong>"${noticiaAEliminar?.title}"</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (result.isConfirmed && noticiaAEliminar) {
      this.noticias = this.noticias.filter(noticia => noticia.id !== id);
      Swal.fire({
        title: '¡Eliminada!',
        html: `La noticia <strong>"${noticiaAEliminar.title}"</strong> fue eliminada correctamente`,
        icon: 'success',
        confirmButtonColor: '#2c3e50',
        timer: 4000
      });
    }
  }

  public validarCampos(): boolean {
    return !!this.nuevaNoticia.title?.trim() && 
           this.esImagenValida(this.nuevaNoticia.image) &&
           !!this.nuevaNoticia.description?.trim();
  }
  
  private esImagenValida(url: string): boolean {
    const pattern = /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
    return !!url?.trim() && pattern.test(url);
  }

  private resetFormulario(form: NgForm) {
    // Reset del modelo
    this.nuevaNoticia = {
      id: 0,
      title: '',
      image: '',
      description: '',
      date: new Date()
    };

    // Reset del estado del formulario
    if (form) {
      form.resetForm();
      form.control.markAsUntouched();
      form.control.markAsPristine();
    }
  }
}
