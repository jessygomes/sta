export type CodeProps = {
  id: string;
  email: string | null;
  createdAt: Date;
  code: string;
  userFirstname: string | null;
  userLastname: string | null;
  offreId: string;
  filiereId: string;
  expiresAt: Date | null;
  filiere: {
    id: string;
    nom: string;
  };
};
