export class CreatePhoneDto {
  releasedDate: any;
  title: string;
  brand: string;
  model: string;
  model_id: string;
  category: string;
  variants: { ROM: number; RAM: number; price: number }[];
  status: string;
  approved: boolean;
  img_url: string;
  content: ContentDto;
}

export class ContentDto {
  [key: string]: any;
}
