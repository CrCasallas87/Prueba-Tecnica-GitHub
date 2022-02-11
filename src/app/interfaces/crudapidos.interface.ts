export interface ApiCrudDosOirigin {
    data:ApiCrudDosInfo[],
    meta:Array<{
        count:number}>;
}

export interface ApiCrudDosInfo {
    id: string,
    canonicalTitle:string,
    averageRating:string,
    episodeCount:number
}   