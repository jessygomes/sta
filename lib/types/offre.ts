export interface OffreProps {
  nom: string;
  description: string;
  parametres: {
    access: number;
    details: {
      adresseMail: boolean;
      responsable: boolean;
      adressePostale: boolean;
      siret: boolean;
      codeApeNaf: boolean;
      telephone: boolean;
      nomTuteur: boolean;
      adresseMailTuteur: boolean;
      telephoneTuteur: boolean;
    };
  };
}
