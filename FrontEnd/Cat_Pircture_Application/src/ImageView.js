

class ImageView {
    $imageView = null;
    data = null;

    constructor({ $target, data }) {
        const $imageView = document.createElement("div");
        this.$imageView = $imageView;
        $imageView.className = "Modal ImageViewer";
        $target.appendChild($imageView);

        this.data = data;

        this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        if (this.data.visible) {
            this.$imageView.innerHTML = `
                <div class="content">
                    <img src="${this.data.image}">
                </div>`;
            this.$imageView.style.visibility = "visible";
        } else {
            this.$imageView.style.visibility = "hidden";
        }
    }
}