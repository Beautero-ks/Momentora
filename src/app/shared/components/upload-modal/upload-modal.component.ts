import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {
  @Output() close = new EventEmitter<void>();

  formData = {
    title: '',
    description: '',
    tags: '',
    image: null as File | null
  };

  imagePreview: string | ArrayBuffer | null = null;

  // handleFileInput(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput.files && fileInput.files.length > 0) {
  //     this.selectedFile = fileInput.files[0];
  //   }
  // }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.formData.image = input.files[0];

      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(this.formData.image);
    }
  }

  submit(): void {
    // Simuler une "upload" locale
    const uploadedData = {
      ...this.formData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      tags: this.formData.tags.split(',').map(tag => tag.trim()),
      author: {
        name: 'Anonymous',
        avatar: 'https://source.unsplash.com/random/100x100?person',
        bio: 'User-submitted photo',
        isFollowing: false
      },
      likes: 0
    };

    console.log('Simulated upload data:', uploadedData);

    // Optionnel : stocker temporairement dans localStorage
    const existing = JSON.parse(localStorage.getItem('uploadedPhotos') || '[]');
    existing.push(uploadedData);
    localStorage.setItem('uploadedPhotos', JSON.stringify(existing));

    alert('Photo uploaded successfully!');
    this.close.emit(); // Ferme la modal
  }


  onClose(): void {
    this.close.emit();
  }
}

