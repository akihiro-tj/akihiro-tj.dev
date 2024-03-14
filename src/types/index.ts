export type PostMetadata = {
  id: string;
  title: string;
  url: string;
  publishedDate: Date;
  updatedDate?: Date;
};

export type TagMetadata = {
  id: string;
  url: string;
  name: string;
};
