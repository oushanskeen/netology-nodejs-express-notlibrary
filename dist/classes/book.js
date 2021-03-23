"use strict";
/*  ¦ ¦ ¦id¦: ¦17¦,
  ¦ ¦ ¦title¦: "",
  ¦ ¦ ¦description¦: "",
  ¦ ¦ ¦authors¦: "",
  ¦ ¦ ¦favorite¦: "",
  ¦ ¦ ¦fileCover¦: "",
  ¦ ¦ ¦fileName¦: "",
  ¦ ¦ ¦fileBook¦: ""
*/
class CBook {
    constructor(bookData) {
        this.book = bookData;
    }
    showBook() {
        return this.book;
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
