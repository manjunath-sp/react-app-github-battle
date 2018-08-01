const axios = require('axios');

let getProfile = (username) => axios.get(`https://api.github.com/users/${username}`).then((user) => user.data);

let getRepos = (username) => axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);

let getStarCount = (repos) => repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);

let calculateScore = ({ followers }, repos) => (followers * 3) + getStarCount(repos);

let handleError = (error) => {
    console.warn(error);
    return null;
}

let getUserData = (player) => {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile, repos)
    }))
}

let sortPlayers = (players) => players.sort((a, b) => b.score - a.score);

module.exports = {
    battle: (players) => {
        return Promise.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError);
    },
    fetchPopularRepos: (language) => {
        var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
        return axios.get(encodedURI)
            .then(({ data }) => data.items);
    }
};