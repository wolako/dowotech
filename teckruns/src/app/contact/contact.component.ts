import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formb.group({
      service: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Exemple de validation pour 10 chiffres
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const { nom, prenom, email, phone, service, message } = this.contactForm.value;
      
      this.contactService.addContact(nom, prenom, email, phone, service, message).subscribe(
        response => {
          console.log(this.contactForm.value);
          console.log('Réponse du serveur:', response);
          this.successMessage = "Merci de nous avoir contactés, nous vous reviendrons dans un bref délai !";
          this.errorMessage = "";

          // Réinitialiser le formulaire après un délai
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
            this.contactForm.reset();
          }, 3000);
        },
        error => {
          console.error('Erreur lors de l\'envoi du formulaire:', error);
          console.error(error);
          this.successMessage = "";
          this.errorMessage = "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer plus tard.";
          
          // Réinitialiser les messages d'erreur après un délai
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    } else {
      console.log("Formulaire invalide, veuillez vérifier les champs");
      this.successMessage = "";
      this.errorMessage = "Le formulaire est invalide. Veuillez vérifier les champs.";
      
      // Réinitialiser les messages d'erreur après un délai
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }
}
