function App($app) {
    this.state = {
        isRoot: false,
        nodes: [],
        depth: []
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
        onClick: (node) => {
            if (node.type === 'DIRECTORY') {
                // DIRECTORYT인 경우 처리
                // 여기에서 Breadcrumb 관련 처리를 하게 되면, Nodes에서는 Breadcrumb를 몰라도 됨.
            } else if (node.type === 'FILE') {
                // FILE인 경우 처리
            }
        }
    });
};