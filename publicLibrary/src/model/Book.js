//CONSTRUCTOR
function Book(slots) 
{
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
};
//class level property (needs to be within the brackets?)
Book.instances = {};

//convert each row into a Book object
Book.convertRow2Obj = function (bookRow) 
{
    var book = new Book(bookRow);
    return book;
}
//load all books from the local storage
Book.loadAll = function () 
{
    var i=0, key=[], bookTableString="", bookTable={};
    try 
    {
        if (localStorage["bookTable"]) 
        {
            //retrieving the table from local storage as a string
            bookTableString = localStorage["bookTable"];
        }
    }
    catch (e) 
    {
        //catch if the table cannot be retrieved 
        alert("Error when reading from Local Storage\n" + e)
    }
    if (bookTableString)
    {
        //convert the string into a map of the books
        bookTable = JSON.parse(bookTableString);
        keys = Object.keys(bookTable);
        console.log(keys.length +"books loaded.");
        for (i=0; i < keys.length; i++)
        {
            key = keys[i];
            Book.instances[key] = Book.convertRow2Obj(bookTable[key]);
        }
    }
};
//save all instances of Book to local storage
Book.saveAll = function() 
{
    var bookTableString="", error=false,
    nmrOfBooks = Object.keys(Book.instances).length;
    try
    {
        //convert map into string
        bookTableString = JSON.stringify(Book.instances);
        //write the string as the value of the key "bookTable"
        localStorage["bookTable"] = bookTableString;
    }
    catch (e) 
    {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log(nmrOfBooks + " books saved.");
};
//create a new Book instance 
Book.add = function(slots)
{
    var book = new Book(slots);
    Book.instances[slots.isbn] = book;
    console.log("Book " + slots.isbn + " created!");
};
//get the book from Book.instances and re-assing values
Book.update = function(slots) 
{
    var book = Book.instances[slots.isbn];
    var year = parsteInt(slots.year);
    if (book.title !== slots.title)
    {
        book.title =slots.title;
    }
    if (book.year !== year) 
    {
        book.year = year;
    }
    console.log("Book " + slots.isbn + " modified!");
};
Book.destroy = function(isbn)
{
    if(Book.instances[isbn])
    {
        console.log("Book " + isbn + " deleted");
    }
    else 
    {
        console.log("There is no book with ISBN " + isbn + " in the database!");
    }
};
Book.createTestData = function() 
{
    Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
    Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999});
    Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
    Book.saveAll();
};
Book.clearData = function()
{
    if(confirm("Do you really want to delete all book data?"))
    {
    localStorage["bookTable"] = "{}";
    }
};

