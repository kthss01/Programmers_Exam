

class Nodes {
    $nodes = null;
    data = null;
    onClick = null;

    constructor({ $target, initData, onClick }) {
        this.$nodes = document.createElement("div");
        this.$nodes.className = "Nodes";
        $target.appendChild(this.$nodes);

        this.data = initData;
        this.onClick = onClick;

        // this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        this.$nodes.innerHTML = this.data.some(node => node.parent !== null) || this.data.length === 0 ? 
            `
                <div class="Node">
                    <img src="./assets/prev.png">
                </div>
            ` : '';

        this.$nodes.innerHTML += this.data
            .map(
                node => `
                    <div class="Node">
                        <img src="${node.type === "FILE" ? "./assets/file.png" : "./assets/directory.png"}">
                        <div>${node.name}</div>
                    </div>
                `
            )
            .join("");

        this.$nodes.querySelectorAll(".Node").forEach((node, index) => {
            if (index === 0) {

            } else {
                node.addEventListener("click", () => {
                    this.onClick(this.data[index-1].id);
                });
            }
        });
    }
}