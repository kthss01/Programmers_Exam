const API_ENDPOINT = 
    "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
const IMAGE_ENDPOINT = 
    "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

const request = async (url) => {
    try {
        const result = await fetch(url);
        return result.json();
    } catch (e) {
        console.warn(e);
    }
}

const api = {
    fetchCats: () => {
        return request(`${API_ENDPOINT}`);
    },

    fetchCat: id => {
        return request(`${API_ENDPOINT}/${id}`);
    },

    fetchCatImg: path => {
        return request(`${IMAGE_ENDPOINT}/${path}`)
    },
}