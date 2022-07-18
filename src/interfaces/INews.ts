export interface INewsProps{
    news:INews
}

export interface INews{
    id?:number,
    title:ILanguages,
    content:ILanguages,
    photo?:string
}

export interface INewsDTO{
    titleAz:string,
    titleRu:string,
    titleEn:string,
    photo:string,
    realPhoto?:any,
    contentAz:string,
    contentEn:string,
    contentRu:string
}

interface ILanguages {
    az:string,
    en:string,
    ru:string
}
