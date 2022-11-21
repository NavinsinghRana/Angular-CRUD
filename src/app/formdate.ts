export class Form {
   id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  dob?: string;
  userage?: string;
  gender?: string;
  imgdata?: FormImageData;
}

export class FormImageData{
  imgUrl?: any[];
  imgCount?: number;
}
