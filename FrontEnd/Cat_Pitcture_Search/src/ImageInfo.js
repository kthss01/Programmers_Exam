class ImageInfo {
    $imageInfo = null;
    data = null;
  
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("div");
      $imageInfo.className = "ImageInfo";
      this.$imageInfo = $imageInfo;
      $target.appendChild($imageInfo);
  
      this.data = data;
  
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
  
        this.$imageInfo.innerHTML = `
          <details class="content-wrapper">
            <header class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </header>
            <img src="${url}" alt="${name}"/>        
            <body class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </body>
          </details>`;
        this.$imageInfo.style.display = "block";
      } else {
        this.$imageInfo.style.display = "none";
      }
    }
  }
  