class ImageInfo {
    $imageInfo = null;
    data = null;
  
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("div");
      $imageInfo.className = "ImageInfo";
      // $imageInfo.classList.add('test');
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
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
        this.$imageInfo.style.display = "block";
  
        this.$imageInfo.querySelector('.close').addEventListener("click", () => {
            this.close();
        });
        window.addEventListener('keyup', e => {
            if (e.key === 27) {
              this.close();
            }
        });
        this.$imageInfo.addEventListener("click", (e) => {
          // console.log(e.target);
          // console.log(e.target.getAttribute('class'));
  
          if (e.target.getAttribute('class') === 'ImageInfo') {
            this.close();
          }
        });
      } else {
        this.$imageInfo.style.display = "none";
      }
    }
  
    close() {
        this.data.visible = false;
        this.render();
    }
  }
  