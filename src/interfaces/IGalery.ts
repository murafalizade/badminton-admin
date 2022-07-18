export interface IGalery{
    id?:number,
    thumbnail:string,
    name:ILanguages,
    images:IImage[]
}

interface IImage {
    name:string
}

interface ILanguages {
    az:string,
    en:string,
    ru:string
}

export interface IGaleryProps{
    galery: IGalery
}

export interface IGaleryInput{
    name:ILanguages
}

export interface IGaleryDTO {
    nameAz:string,
    nameEn:string,
    nameRu:string
    images:string[]
}