export type Post = {
  meta: {
    title: string;
    published: Date;
    tags: string[];
  },
  content: string;
  url: string;
};
