export type Data = {
  ProjectTitle: string;
  ShortDescription: string;
  Location: string;
  Image: {
    Alt: string;
    Border: string;
    Class: string;
    Height: number;
    HSpace: number;
    Src: string;
    VSpace: number;
    Width: number;
    MediaId: string;
    Title: string;
    Language: { Name: string };
    MediaExists: boolean;
  };
  PageUrl: string;
  searchScore?: number;
};

export interface DataInterface {
  data?: Array<Data>;
  loading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}
