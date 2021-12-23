export const getEpisodeData = (episode) => ({
    season: episode.slice(0, 3),
    episode: episode.slice(3, 6),
});
