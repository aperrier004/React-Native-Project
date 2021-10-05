import { Alert, StyleSheet } from "react-native";
import { getAccess_token } from "../services/spotify.token";
import Track from "../services/track.model";
import Album from "./album.model";
import Artist from "../services/artist.model";
import AudioFeatures from "../services/audiofeatures.model";
const rootEndpoint = "https://api.spotify.com";

export interface Song {
  id: number;
  name: string;
  preview_url: string;
  popularity: number;
  duration_ms: number;
  explicit: boolean;
  artists: Array<Artist>;
  album: Album;
  images: Array<String>;
}

class SpotifyApi {
  private fetchFromApi(query: string): Promise<Array<any>> {
    //probleme si on met track en parametre faut refaire pour artist
    const userAccessToken = getAccess_token().access_token;
    return fetch(query, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse.items || [])
      .catch((error) => {
        console.error(error);
      });
  }

  //Création d'artiste en fonction de leur provenance
  private createArtists(artists: Array<Artist>): Array<Artist> {
    return artists.map((artist) => this.createArtist(artist));
  }
  private createArtistsSong(song: Song): Array<Artist> {
    return song.artists.map((artist) => this.createArtist(artist));
  }
  private createArtistsAlbum(album: Album): Array<Artist> {
    return album.artists.map((artist) => this.createArtist(artist));
  }
  private createArtist(artist: Artist): Artist {
    var id = artist.id;
    var images = Array(null);
    var genres = Array(null);
    if (artist.images === undefined) {
      this.getArtistebyid(id).then((artist: Artist) => {
        images = Object.values(artist.images[0]);
        genres = artist.genres;
      });
    } else {
      images = artist.images;
      genres = artist.genres;
    }
    var name = artist.name;
    var popularity = artist.popularity;

    return new Artist(id, name, popularity, images, genres);
  }

  //Creation d'albums
  private createAlbum(song: Song): Album {
    var artist = this.createArtistsAlbum(song.album);
    return new Album(
      song.album.id,
      song.album.name,
      song.album.popularity,
      artist,
      song.album.explicit,
      song.album.genres,
      song.album.images
    );
  }

  //Creation de tracks
  private createTracks(songs: Array<Song>): Array<Track> {
    return songs.map((song) => this.createTrack(song));
  }

  private createTrack(song: Song): Track {
    var artist = this.createArtistsSong(song);
    var album = this.createAlbum(song);

    var son = new Track(
      song.id,
      song.name,
      song.preview_url,
      song.popularity,
      song.duration_ms,
      song.explicit,
      artist,
      album
    );

    return son;
  }

  //Creation d'audifeatures
  private createAudioFeatures(
    audiofeatures: Array<AudioFeatures>
  ): Array<AudioFeatures> {
    return audiofeatures.map((audiofeature) =>
      this.createAudioFeature(audiofeature)
    );
  }

  private createAudioFeature(audiofeature: AudioFeatures): AudioFeatures {
    var id = audiofeature.id;
    var popularity = audiofeature.popularity;
    var danceability = audiofeature.danceability;
    var energy = audiofeature.energy;
    var valence = audiofeature.danceability;
    var acousticness = audiofeature.acousticness;

    return new AudioFeatures(
      id,
      popularity,
      danceability,
      energy,
      valence,
      acousticness
    );
  }

  //Requetes
  //Recuperation des nb tracks les plus écoutées
  getFavoriteTracks(nb: number): Promise<Array<Track>> {
    return this.fetchFromApi(`${rootEndpoint}/v1/me/top/tracks?limit=${nb}`)
      .then((songs) => this.createTracks(songs))
      .catch();
  }
  //Recuperation des nb artistes les plus écoutées
  getFavoriteArtistes(nb: number): Promise<Array<Artist>> {
    return this.fetchFromApi(`${rootEndpoint}/v1/me/top/artists?limit=${nb}`)
      .then((artist) => this.createArtists(artist))
      .catch();
  }
  //Recuperation des artistes par leur identifiant
  getArtistebyid(id: number) {
    const userAccessToken = getAccess_token().access_token;
    return fetch(`${rootEndpoint}/v1/artists/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
      .then((response) => response.json())
      .catch();
  }

  //Récupération des meilleures tracks d'un artiste sur le marché francais
  getTopTrackArtist(id: number) {
    const userAccessToken = getAccess_token().access_token;
    return fetch(`${rootEndpoint}/v1/artists/${id}/top-tracks?market=FR`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse.tracks || [])
      .then((songs) => this.createTracks(songs))
      .catch();
  }
  //Recuperation des artistes associés à un autre
  getRelatedArtists(id: number) {
    const userAccessToken = getAccess_token().access_token;
    return fetch(`${rootEndpoint}/v1/artists/${id}/related-artists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse.artists || [])
      .then((artistes) => this.createArtists(artistes))
      .catch();
  }
  //Recuperation de l'utilisateur connecté
  getUser(): Promise<Array<any>> {
    const userAccessToken = getAccess_token().access_token;

    return fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }).then((response) => response.json());
  }
  //Recuperation de la danceability
  getDanceability(idtrack: string): Promise<Array<any>> {
    const userAccessToken = getAccess_token().access_token;

    return fetch(`${rootEndpoint}/v1/audio-features/${idtrack}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }).then((response) => response.json());
  }
  //Recuperation des audiofeatures
  getAudioFeatures(idsTrack: string[]): Promise<Array<AudioFeatures>> {
    const userAccessToken = getAccess_token().access_token;
    var requestIds = "";

    idsTrack.forEach((element) => {
      if (requestIds != "") {
        requestIds += "%2C"; // d'après la doc, chaque id est séparé par "%2C"
      }
      requestIds += element;
    });

    return fetch(`${rootEndpoint}/v1/audio-features?ids=${requestIds}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse.audio_features || []);
  }

  //Recommendation avec les paramètres calculé pour le profil
  getRecommandation(
    artists: string,
    tracks: string,
    danceability: number,
    valence: number,
    energy: number,
    accousticness: number
  ) {
    const userAccessToken = getAccess_token().access_token;
    const dance = encodeURIComponent(danceability);
    const val = encodeURIComponent(valence);
    const acous = encodeURIComponent(accousticness);
    const ener = encodeURIComponent(energy);

    return fetch(
      `${rootEndpoint}/v1/recommendations?seed_artists=${artists}&seed_tracks${tracks}&target_acousticness=${acous}&target_danceability=${dance}&target_energy=${ener}&target_valence=${val}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    ).then((response) => response.json());
  }

  //Recommendation avec les filtres
  getRecommandationFiltered(
    artists: string,
    tracks: string,
    limit: number,
    danceability: number,
    valence: number,
    energy: number,
    acousticness: number,
    instrumentalness: number,
    popularity: number
  ) {
    const userAccessToken = getAccess_token().access_token;
    const dance = encodeURIComponent(danceability);
    const val = encodeURIComponent(valence);
    const acous = encodeURIComponent(acousticness);
    const ener = encodeURIComponent(energy);
    const lim = encodeURIComponent(limit);
    const instru = encodeURIComponent(instrumentalness);
    const pop = encodeURIComponent(popularity);
    return fetch(
      `${rootEndpoint}/v1/recommendations?limit=${lim}&seed_artists=${artists}&seed_tracks=${tracks}&min_acousticness=${acous}&min_danceability=${dance}&min_energy=${ener}&min_instrumentalness=${instru}&min_popularity=${pop}&min_valence=${val}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    ).then((response) => response.json());
  }

  //Creation d'une playlist
  createPlaylist(user_id: string) {
    const userAccessToken = getAccess_token().access_token;

    return fetch(`${rootEndpoint}/v1/users/${user_id}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
      body: JSON.stringify({
        name: "ProfilMusical",
        description:
          "Vous trouverez ici des musiques recommandées spécialement pour votre profil !",
        public: false,
      }),
    })
      .then((response) => {
        response.json(),
          Alert.alert(
            "Ajoutée",
            "Vous pouvez désormais ajouter et retrouver nos recommandations dans la playlist ProfilMusical",
            [{ text: "Ok" }]
          );
      })
      .catch((e) => console.log(e.message));
  }

  //Recuperation d'une playlist via le nom de l'utilisateur
  getPlaylistProfilMusicalid(user_id: string) {
    const userAccessToken = getAccess_token().access_token;
    return fetch(`${rootEndpoint}/v1/users/${user_id}/playlists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }).then((response) => response.json());
  }

  //Recuperation de tracks via l'id d'une playlist
  getPlaylistTracks(playlist_id: string) {
    const userAccessToken = getAccess_token().access_token;
    return fetch(`${rootEndpoint}/v1/playlists/${playlist_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => jsonResponse.tracks.items)
      .catch();
  }

  //Ajout de track dans une playlist
  addTrackToPlaylist(playlist_id: string, track_id: string) {
    const userAccessToken = getAccess_token().access_token;
    return fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?position=0&uris=spotify%3Atrack%3A${track_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
  }
}

export default new SpotifyApi();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
