class SearchRamdom {
    constructor({ $target, onSearch }) {
      const $searchRamdom = document.createElement("button");
      this.$searchRamdom = $searchRamdom;
      this.$searchRamdom.textContent = "랜덤 검색|";
  
      $searchRamdom.className = "SearchRamdom";
      $target.appendChild($searchRamdom);
  
      $searchRamdom.addEventListener("click", onSearch);
  
      console.log("SearchRandom created.", this);
    }
    render() {}
  }
  