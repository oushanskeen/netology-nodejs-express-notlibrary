/*  ¦ ¦ ¦id¦: ¦17¦,
  ¦ ¦ ¦title¦: "",
  ¦ ¦ ¦description¦: "",
  ¦ ¦ ¦authors¦: "",
  ¦ ¦ ¦favorite¦: "",
  ¦ ¦ ¦fileCover¦: "",
  ¦ ¦ ¦fileName¦: "",
  ¦ ¦ ¦fileBook¦: ""
*/
var CBook = /** @class */ (function () {
    function CBook(bookData) {
        this.book = bookData;
    }
    CBook.prototype.showBook = function () {
        return this.book;
    };
    return CBook;
}());
//const bookOne = new Book(["a","b","c","d","e","f","g","h"]);
var bookOne = new CBook({
    id: "mockID",
    title: "mockTitle",
    description: "mockDescription",
    authors: "mockAuthors",
    favorite: "mockFavorite",
    fileCover: "mockFilecover",
    fileName: "mockFilename",
    fileBook: "mockFilebook"
});
console.log(bookOne.showBook());
