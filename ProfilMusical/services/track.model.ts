import Album from "../services/album.model";
import Artist from "../services/artist.model";

export default class Track {
  // preview_url = petite bande son de la track
  constructor(
    public id: number,
    public name: string,
    public preview_url: string,
    public popularity: number,
    public duration_ms: number,
    public explicit: boolean,
    public artists: Array<Artist>,
    public album: Album
  ) {}
}
