export interface Feature {
  id: string;
  nameFeature: string;
  descFeature: string;
}

class FeatureService {
  private features: Array<Feature> = [
    {
      id: "1",
      nameFeature: "Danceability ",
      descFeature:
        "Décrit dans quelle mesure un morceau est adapté à la danse sur la base d'une combinaison d'éléments musicaux, notamment le tempo, la stabilité du rythme, la force du battement et la régularité générale",
    },
    {
      id: "2",
      nameFeature: "Valence",
      descFeature:
        "Décrit la positivité musicale véhiculée par un titre. Les morceaux à valence élevée sont plus positifs (par exemple, heureux, gais, euphoriques), tandis que les morceaux à valence faible sont plus négatifs (par exemple, tristes, déprimés, en colère)",
    },
    {
      id: "3",
      nameFeature: "Energy",
      descFeature:
        "Représente une mesure perceptive de l'intensité et de l'activité. En général, les morceaux énergétiques sont rapides, forts et bruyants. Par exemple, le death metal a une énergie élevée, tandis qu'un prélude de Bach obtient un score faible sur l'échelle",
    },
    {
      id: "4",
      nameFeature: "Accousticness",
      descFeature:
        "Une mesure de confiance de 0,0 à 1,0 pour déterminer si le titre est acoustique, c’est-à-dire si des instruments électroniques modernes ont été employés",
    },
    {
      id: "5",
      nameFeature: "Popularity",
      descFeature:
        "Un indice de 0 à 100 pour indiquer la popularité d’un artiste (100 étant le plus populaire possible)",
    },
  ];

  // Load all features asynchronously. Returns a Promise
  getAll(): Promise<Array<Feature>> {
    return new Promise((resolve) => {
      resolve(this.features);
    });
  }
}

export default new FeatureService();
