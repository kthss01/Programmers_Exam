// app.js
function App($app) {
    this.state = {
        isRoot: false,
        nodes: [],
        depth: [],
        selectedFilePath: null
    };

    const breadcrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth
    });

    const nodes = new Nodes({
        $app,
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        // 함수를 파라미터로 던지고, Nodes 내에서 click 발생시 이 함수를 호출하게 함
        // 이러면 Nodes 내에선 click 후 어떤 로직이 일어날지 알아야할 필요가 없음
        onClick: async (node) => {
            try {
                if (node.type === 'DIRECTORY') {
                    // DIRECTORYT인 경우 처리
                    // 여기에서 Breadcrumb 관련 처리를 하게 되면, Nodes에서는 Breadcrumb를 몰라도 됨.
                    const nextNodes = await request(node.id);
                    this.setState({
                        ...this.state,
                        depth: [...this.state.depth, node],
                        nodes: nextNodes
                    });
                } else if (node.type === 'FILE') {
                    // FILE인 경우 처리
                    // 이미지 보기 처리하기
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.fiiePath
                    });
                } 
            } catch(e) {
                // 에러처리하기
            }
        },
        onBackClick: async () => {
            try {
                // 이전 state를 복사하여 처리
                const nextState = { ...this.state };
                nextState.depth.pop();

                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

                // root로 온 경우이므로 root 처리
                if (prevNodeId === null) {
                    const rootNodes = await request();
                    this.setState({
                        ...nextState,
                        isRoot: true,
                        nodes: rootNodes
                    });
                } else {
                    const prevNodes = await request(prevNodeId);

                    this.setState({
                        ...nextState,
                        isRoot: false,
                        nodes: prevNodes
                    });
                }
            } catch(e) {
                // 에러처리
            }
        }
    });

    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedNodeImage
    });

    // App 컴포넌트에도 setState 함수 정의하기
    this.setState = (nextState) => {
        this.state = nextState;
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        });
        imageView.setState(this.state.selectedFilePath);
    }

    const init = async () => {
        try {
            const rootNodes = await request();
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            });
        } catch(e) {
            // 에러처리 하기
        }
    }

    init();
};