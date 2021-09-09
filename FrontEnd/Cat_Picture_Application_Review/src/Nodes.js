// Nodes 컴포넌트
// 생성된 DOM을 어이데 append 할지를 $app 파라미터로 받기
// 파라미터는 구조 분해 할당 방식으로 처리
function Nodes({ $app, initialState }) {
    this.state = initialState;

    // Nodes 컴포넌트를 렌더링 할 DOM을 this.$target이라는 이름으로 생성
    this.$target = document.createElement('ul');
    $app.appendChild(this.$target);

    // state를 받아서 현재 컴포넌트의 state를 변경하고 다시 렌더링하는 함수
    this.setState = (nextState) => {
        this.state = nextState;
        // render 함수 내에서 this.state 기준으로 렌더링을 하기 때문에,
        // 단순히 이렇게만 해주어도 상태가 변경되면 화면이 알아서 바뀜
        this.render();
    }

    // 파라미터가 없는 Nodes의 render 함수,
    // 현재 상태(this.state) 기준으로 렌더링함
    this.render = () => {
        this.$target.innerHTML = this.state.nodes.map(node => `<li>${node.name}</li>`);
    }

    // 인스턴스화 이후 바로 render 함수를 실행하며 new로 생성하자마자 렌더링 되도록 할 수 있음
    this.render();
}