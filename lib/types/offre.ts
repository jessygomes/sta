export interface OffreProps {
  nom: string;
  description: string;
  price: number;
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

export interface OffreFrontProps {
  id: string;
  nom: string;
  description: string;
  price: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parametres: any;
}
