//export interface RespuestaTopHeadlines {
//    status: string;
//    totalResults: number;
//    articles: Article[];
//  }
  
//  export interface Article {
//    source: Source;
//    author?: string;
//    title: string;
//    description: string;
//    url: string;
//    urlToImage: string;
//    publishedAt: string;
//    content?: string;
//  }
  
//  export interface Source {
//    id?: string;
//    name: string;
//  }

export interface RespuestaTopHeadLines {
    status: string;
    data: Data[];
  }

export interface Data{
    date: Date;
    title: string;
    type: string;
    inalienable: boolean;
    extra: string;
}