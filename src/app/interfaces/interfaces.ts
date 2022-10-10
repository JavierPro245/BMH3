export interface RespuestaTopHeadLines {
    status: string;
    totalResults: number;
    datas: Data[];
}

export interface Data {
    date: string;
    title: string;
    type: string;
}
