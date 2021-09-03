

class Breadcrumb {
    constructor({ $target, initData }) {
        const $nav = document.createElement("nav");
        this.$nav = $nav;
        this.$nav.className = "Breadcrumb";
        $target.appendChild($nav);
        
        this.data = initData;
        
        this.render();
        
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {

        this.$nav.innerHTML = this.data
            .map(
                path => `
                    <div>${path}</div>
                `
            )
            .join("");
        
    }

}