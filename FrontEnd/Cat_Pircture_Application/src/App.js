console.log("app run");

class App {
    $target = null;
    data = [];

    constructor($target) {
        this.$target = $target;

        this.breadcrumb = new Breadcrumb({
            $target,
            initData: ['root', '노란고양이']
        });

        this.nodes = new Nodes({
            $target,
            initData: this.data,
            onClick: async id => {
                const response = await api.fetchCat(id);
                console.log(response);
                this.setState(response);
            }
        });

        this.imageViews = new ImageView({
            $target,
            data: {
                visible: false,
                image: null
                // visible: true,
                // image: "./assets/sample_image.jpg"
            }
        });

        (async () => {
            const response = await api.fetchCats();
            console.log(response);
            this.setState(response);
            return response;
        })();
    }

    setState(nextData) {
        console.log(this);
        this.data = nextData;
        this.nodes.setState(nextData);
    }
}