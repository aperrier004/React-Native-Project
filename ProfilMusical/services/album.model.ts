import Artist from "../services/artist.model";

export default class Album {
  // preview_url = petite bande son de la track
  constructor(
    public id: number,
    public name: string,
    public popularity: number,
    public artists: Array<Artist>,
    public explicit: boolean,
    public genres: Array<string>,
    public images: Array<String>
  ) {}
}
