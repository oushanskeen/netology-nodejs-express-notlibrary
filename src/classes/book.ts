/*  ¦ ¦ ¦id¦: ¦17¦,
  ¦ ¦ ¦title¦: "",
  ¦ ¦ ¦description¦: "",
  ¦ ¦ ¦authors¦: "",
  ¦ ¦ ¦favorite¦: "",
  ¦ ¦ ¦fileCover¦: "",
  ¦ ¦ ¦fileName¦: "",
  ¦ ¦ ¦fileBook¦: ""
*/

interface IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

class CBook {
  book: IBook;

  constructor(bookData:IBook){
    this.book = bookData;
  }

  public showBook():IBook{
    return this.book
  }
}

const bookOne = new CBook({
  id: "mockID",
  title: "mockTitle",
  description: "mockDescription",
  authors: "mockAuthors",
  favorite: "mockFavorite",
  fileCover: "mockFilecover",
  fileName: "mockFilename",
  fileBook: "mockFilebook",
});
console.log(bookOne.showBook());

