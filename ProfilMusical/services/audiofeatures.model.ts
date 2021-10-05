export default class AudioFeatures {
  constructor(
    public id: number,
    public popularity: number,
    public danceability: number,
    public energy: number,
    public valence: number,
    public acousticness: number,
  ) {}
}
