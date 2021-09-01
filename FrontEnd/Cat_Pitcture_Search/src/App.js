console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        // api.fetchCats(keyword).then(({ data }) => this.setState(data));

        const response = await api.fetchCats(keyword);
        const cats = response.data;
        this.setState(cats);
      }
    });

    this.searchRandom = new SearchRamdom({
      $target,
      onSearch: async () => {
        // api.fetchRandCats().then(({ data }) => this.setState(data));
        const response = await api.fetchRandCats();
        const cats = response.data;
        this.setState(cats);
      }
    })

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async image => {
        // api.fetchCat(image.id).then(({ data }) => 
        // {
        //   // console.log(data);
        //   this.imageInfo.setState({
        //   visible: true,
        //   image: data});
        // });

        const response = await api.fetchCat(image.id);
        const data = response.data;
        this.imageInfo.setState({
          visible: true,
          image: data 
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
