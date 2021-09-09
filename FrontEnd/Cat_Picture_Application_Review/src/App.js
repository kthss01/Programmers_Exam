// app.js

import ImageView from './ImageView.js'
import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import { request } from './api.js'
import Loading from './Loading.js';

// nodeId: nodes 형태로 데이터를 불러올 때마다 이곳에 데이터를 쌓는다.
const cache = {};

export default function App($app) {
    this.state = {
        isRoot: true,
        nodes: [],
        depth: [],
        selectedFilePath: null,
        isLoading: false,
    };

    const breadcrumb = new Breadcrumb({
        $app,
        initialState: [],
        onClick: (index) => {
            if (index === null) {
                this.setState({
                    ...this.state,
                    depth: [],
                    nodes: cache.root,
                    isRoot: true
                })
                return;
            }

            // breadcrumb에서 현재 위치를 누른 경우는 무시함
            if (index === this.state.depth.length - 1) {
                return;
            }

            const nextState = { ...this.state };
            const nextDepth = this.state.depth.slice(0, index + 1);

            this.setState({
                ...nextState,
                depth: nextDepth,
                nodes: cache[nextDepth[nextDepth.length - 1].id],
            });
        }
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

                    if(cache[node.id]) {
                        // console.log('onclick cache', cache);
                        // console.log('onclick state', this.state);
                        this.setState({
                            ...this.state,
                            isRoot: false,
                            depth: [...this.state.depth, node],
                            nodes: cache[node.id]
                        });
                    } else {
                        this.setState({
                            ...this.state,
                            isLoading: true
                        })
    
                        // DIRECTORYT인 경우 처리
                        // 여기에서 Breadcrumb 관련 처리를 하게 되면, Nodes에서는 Breadcrumb를 몰라도 됨.
                        const nextNodes = await request(node.id);
                        this.setState({
                            ...this.state,
                            isRoot: false, // 클릭시에는 root가 아니므로 false 처리함
                            depth: [...this.state.depth, node],
                            nodes: nextNodes,
                        });

                        // cache update
                        cache[node.id] = nextNodes;
                    }
                } else if (node.type === 'FILE') {

                    // console.log(this.state, node.filePath);
                    // console.log({...this.state, selectedFilePath: node.filePath});

                    // 미리 한번 변수에 넣고 나서야 합쳐짐
                    const tempState = {...this.state, selectedFilePath: node.filePath};

                    // FILE인 경우 처리
                    // 이미지 보기 처리하기
                    // 이게 안먹힘 한 객체로 합쳐져서 안들어감
                    // this.setState({
                    //     ...this.state,
                    //     selectedFilePath: node.fiiePath,
                    // });
                    this.setState(tempState);
                } 
            } catch(e) {
                // 에러처리하기
            } finally {
                this.setState({
                    ...this.state,
                    isLoading: false
                })
            }
        },
        onBackClick: async () => {
            try {
                // 이전 state를 복사하여 처리
                const nextState = { ...this.state };
                nextState.depth.pop();

                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

                this.setState({
                    ...this.state,
                    isLoading: true
                })
                
                // 현재 구현된 코드에서는 불러오는 모든 데이터를 cache에 넣고 있으므로
                // 이전으로 돌아가는 경우 이전 데이터가 cache에 있어야 정상임
                // root로 온 경우이므로 root 처리
                if (prevNodeId === null) {
                    //const rootNodes = await request();

                    //console.log(rootNodes);
                    //console.log(cache);

                    this.setState({
                        ...nextState,
                        isRoot: true,
                        nodes: cache.root
                    });
                } else {
                    //const prevNodes = await request(prevNodeId);

                    this.setState({
                        ...nextState,
                        isRoot: false,
                        nodes: cache[prevNodeId]
                    });
                }
            } catch(e) {
                // 에러처리
            } finally {
                this.setState({
                    ...this.state,
                    isLoading: false
                })
            }
        }
    });

    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedFilePath
    });


    const loading = new Loading({
        $app,
        initialState: this.state.isLoading
    });

    // App 컴포넌트에도 setState 함수 정의하기
    this.setState = (nextState) => {

        console.log('setstate', nextState);

        this.state = nextState;
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        });
        imageView.setState(this.state.selectedFilePath);
        loading.setState(this.state.isLoading);
    }

    const init = async () => {
        try {
            this.setState({
                ...this.state,
                isLoading: true
            })

            const rootNodes = await request();
            this.setState({
                ...this.state,
                isLoading: false,
                isRoot: true,
                nodes: rootNodes,
            });

            // 캐시에 추가
            cache.root = rootNodes;

        } catch(e) {
            // 에러처리 하기
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    }

    init();
};