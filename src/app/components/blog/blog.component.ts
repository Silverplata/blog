import { Component } from '@angular/core';
import { IBlog } from '../../interfaces/iblog.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  imports: [FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent {
  noticias: IBlog[] = [
    {
      title: 'Chamonix-Mont-Blanc, Francia',
      image: 'https://www.iloveski.org/wp-content/uploads/2019/06/chamonix-2-1.jpg',
      description: 'Es una ruta de esquí de montaña famosa que atraviesa los Alpes, conectando Chamonix en Francia con Zermatt en Suiza1. Es conocida por sus cumbres icónicas como el Mont Blanc, el Monte Rosa y el Cervino',
      date: new Date()
    },
    {
      title: 'Aspen Snowmass, Colorado, Estados Unidos',
      image: 'https://www.iloveski.org/wp-content/uploads/2019/06/aspen-ski.jpg',
      description: 'Compuesta por cuatro áreas principales (Aspen Mountain, Snowmass, Aspen Highlands y Buttermilk), ofrece más de 300 pistas a lo largo de 509 kilómetros y 42 remontes',
      date: new Date()
    }
  ];

  nuevaNoticia: IBlog = {
    title: '',
    image: '',
    description: '',
    date: new Date()
  };

  agregarNoticia() {
    if (this.validarCampos()) {
      this.nuevaNoticia.date = new Date();
      this.noticias.push({...this.nuevaNoticia});

      // Añade este console.log
      console.log('Nueva noticia agregada:', this.nuevaNoticia);
      console.log('Lista actualizada de noticias:', this.noticias);
      this.resetFormulario();
    }
  }

  private validarCampos(): boolean {
    return !!this.nuevaNoticia.title?.trim() && 
           !!this.nuevaNoticia.image?.trim() && 
           !!this.nuevaNoticia.description?.trim();
  }

  private resetFormulario() {
    this.nuevaNoticia = {
      title: '',
      image: '',
      description: '',
      date: new Date()
    };
  }
}
