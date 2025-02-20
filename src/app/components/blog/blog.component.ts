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
  // 1. Propiedades del componente
  noticias: IBlog[] = [];
  nuevaNoticia: IBlog = {
    id: 1,
    title: '',
    image: '',
    description: '',
    date: new Date()
  };

  // 2. Ciclo de vida OnInit
  ngOnInit(): void {
    this.inicializarNoticias(); // Carga noticias iniciales
  }

  // 3. Método de inicialización
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

  // 4. Método para agregar noticias
  agregarNoticia() {
    if (this.validarCampos()) {
      // Generar nuevo ID
      const nuevoId = this.noticias.length > 0 
                     ? Math.max(...this.noticias.map(n => n.id)) + 1 
                     : 1;
      // Añadir nueva noticia
      this.noticias.push({
        ...this.nuevaNoticia,
        id: nuevoId,  // Asignar el nuevo ID
        date: new Date()
      });

      //console.log('Nueva noticia agregada:', this.nuevaNoticia);
      //console.log('Lista actualizada de noticias:', this.noticias);

      // Reset del formulario
      this.resetFormulario();
    }
  }

  // 5. Método para eliminar noticias
  async eliminarNoticia(id: number) {

    const noticiaAEliminar = this.noticias.find(n => n.id === id);
    
    const result = await Swal.fire({ // Espera la respuesta del usuario con await
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
        timer: 4000
      });
    }
  }

  // 6. Validación de campos
  public validarCampos(): boolean {
    return !!this.nuevaNoticia.title?.trim() && 
           this.esImagenValida(this.nuevaNoticia.image) &&
           !!this.nuevaNoticia.description?.trim();
  }
  
  // 7. Validación específica de imágenes
  private esImagenValida(url: string): boolean {
    // Valida formato URL y extensión de imagen
    const pattern = /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
    return !!url?.trim() && pattern.test(url);
  }

  // 8. Reset del formulario
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
