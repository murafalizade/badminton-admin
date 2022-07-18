export interface IAchive{
    id?:number,
    date:string,
    content:string,
    createdAt?:string
}

export interface IAchiveProps{
    achieve:IAchive
}