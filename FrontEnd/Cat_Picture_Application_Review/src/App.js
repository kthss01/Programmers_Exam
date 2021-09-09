const $app = document.querySelector('.app');

// 테스트를 위한 dummy data 혹은 api를 통해 받아온 data
const initialState = {
    nodes : []
};

const nodes = new Nodes({
    $app,
    initialState
});

// 이후 nodes를 갱신할 일이 있다면 nodes.setState를 호출
const nextState = {
    nodes: [
        {

        }
    ]
};