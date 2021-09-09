// Nodes 컴포넌트
// 생성된 DOM을 어이데 append 할지를 $app 파라미터로 받기
// 파라미터는 구조 분해 할당 방식으로 처리
export default function Nodes({ $app, initialState, onClick, onBackClick }) {
    this.state = initialState;

    // Nodes 컴포넌트를 렌더링 할 DOM을 this.$target이라는 이름으로 생성
    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';
    $app.appendChild(this.$target);

    // state를 받아서 현재 컴포넌트의 state를 변경하고 다시 렌더링하는 함수
    this.setState = (nextState) => {
        this.state = nextState;

        // render 함수 내에서 this.state 기준으로 렌더링을 하기 때문에,
        // 단순히 이렇게만 해주어도 상태가 변경되면 화면이 알아서 바뀜
        this.render();
    }

    // onClick은 함수이며, 클릭한 Node의 type과 id를 파라미터로 넘겨받도록 함
    this.onClick = onClick;

    this.onBackClick = onBackClick;

    // 파라미터가 없는 Nodes의 render 함수,
    // 현재 상태(this.state) 기준으로 렌더링함
    this.render = () => {
        if (this.state.nodes) {
            const nodesTemplate = this.state.nodes.map(node => {
                const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png';

                return `
                    <div class="Node" data-node-id="${node.id}">
                        <img src="${iconPath}" />
                        <div>${node.name}</div>
                    </div>
                `;
            }).join('');

            // console.log(this.state.isRoot);

            // root directory 렌더링이 아닌 경우 뒤로가기를 렌더링
            // 뒤로가기의 경우 data-node-id attribute를 렌더링하지 않음
            this.$target.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="./assets/prev.png"></div>${nodesTemplate}` : nodesTemplate;
        }

        // 기존 이벤트 바인딩 코드 제거
        // // 렌더링된 이후 클릭 가능한 모든 요소에 click 이벤트 걸기
        // this.$target.querySelectorAll('.Node').forEach($node => {
        //     $node.addEventListener('click', (e) => {

        //         // e.target.dataset이 아니라 부모요소의 dataset이었음
        //         // console.log(e);
        //         // console.log(e.target.parentElement);
        //         // console.log(e.target.parentElement.dataset);

        //         // dataset을 통해 data-로 시작하는 attribute를 꺼내올 수 있음
        //         const { nodeId } = e.target.parentElement.dataset;

        //         if (!nodeId) {
        //             this.onBackClick();
        //         }

        //         const selectedNode = this.state.nodes.find(node => node.id === nodeId);

        //         if (selectedNode) {
        //             this.onClick(selectedNode);
        //         }
        //     });
        // });
    }

    this.$target.addEventListener('click', (e) => {
        // $target 하위에 있는 HTML 요소 클릭시 이벤트가 상위로 계속 전파 됨녀서
        // $target까지 오게 됨. 이 특성을 이용한 기법

        // closest를 이용하면 현재 클릭한 요소와 제일 인접한 요소를 가져올 수 있음.
        const $node = e.target.closest('.Node');

        if ($node) {
            const { nodeId } = $node.dataset;

            if (!nodeId) {
                this.onBackClick();
                return;
            }

            const selectedNode = this.state.nodes.find(node => node.id === nodeId);

            if (selectedNode) {
                this.onClick(selectedNode);
            }
        }
    });

    // 인스턴스화 이후 바로 render 함수를 실행하며 new로 생성하자마자 렌더링 되도록 할 수 있음
    this.render();
}