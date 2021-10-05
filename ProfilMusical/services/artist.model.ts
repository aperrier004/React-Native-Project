import Album from "../services/album.model";

export default class Artist {
  constructor(
    public id: number,
    public name: string,
    public popularity: number,
    public images: Array<String>,
    public genres: Array<String>
  ) {}
}
