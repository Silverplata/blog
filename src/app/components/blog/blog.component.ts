import { Component, OnInit } from '@angular/core';
import { IBlog } from '../../interfaces/iblog.interface';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  imports: [FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent implements OnInit {
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

  agregarNoticia() {
    if (this.validarCampos()) {
      // Generar nuevo ID
      const nuevoId = this.noticias.length > 0 
                     ? Math.max(...this.noticias.map(n => n.id)) + 1 
                     : 1;
      
      this.noticias.push({
        ...this.nuevaNoticia,
        id: nuevoId,  // Asignar el nuevo ID
        date: new Date()
      });

      console.log('Nueva noticia agregada:', this.nuevaNoticia);
      console.log('Lista actualizada de noticias:', this.noticias);

      this.resetFormulario();
    }
  }

  async eliminarNoticia(id: number) {
    // Primero obtenemos la noticia para mostrar su título
    const noticiaAEliminar = this.noticias.find(n => n.id === id);
    
    const result = await Swal.fire({
      title: '¿Eliminar noticia?',
      html: `¿Estás seguro de querer eliminar la publicación <strong>"${noticiaAEliminar?.title}"</strong>?`, // Usamos html para formato
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
        html: `La noticia <strong>"${noticiaAEliminar.title}"</strong> fue eliminada correctamente`, // Usamos html aquí también
        icon: 'success',
        confirmButtonColor: '#2c3e50',
        timer: 2000
      });
    }
  }

  public validarCampos(): boolean {
    return !!this.nuevaNoticia.title?.trim() && 
           this.esImagenValida(this.nuevaNoticia.image) &&
           !!this.nuevaNoticia.description?.trim();
  }
  
  private esImagenValida(url: string): boolean {
    // Valida formato URL y extensión de imagen
    const pattern = /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
    return !!url?.trim() && pattern.test(url);
  }

  private resetFormulario() {
    this.nuevaNoticia = {
      id: 0,
      title: '',
      image: '',
      description: '',
      date: new Date()
    };
  }
}
