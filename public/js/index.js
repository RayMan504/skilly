
$(document).ready(function() {
    $.ajax({
         type: "GET",
         url: 'https://express-rayman504.c9users.io/user',
         success: function(user) {
            initView(user);
            // filterButton(user);
            // renderuser(user);
            console.log(user);
         }
         
    });
});
function initView(user) {
    $('#user').append(createProductListItems(user));
    $('input', '#form-search').on('keyup', function(event){
        //event.preventDefault();
        console.log(event.target.value);
        var term = event.target.value;
        var productList = $('#product-list');
        productList.empty();
        // var filteredList = filterButton();
        // var renderedList = renderuser();
        // filterButton(user);
        var filteredList = search(user, term);
        productList.append(createProductListItems((filteredList)));
}

)

/**
 * This function takes an array of user, empties the view, then renders 
 * what's in the array
 */
function renderuser(user) {
    $('#user').empty();
    createProductList().append(createProductListItems(user)).appendTo('#user');
}

/**
 * Returns an <ul> formatted for user.
 */
function createProductList(user) {
    return user
}

/**
 * Returns an Array of <li>
 */ 
function createProductListItems(user) {
    return $.map(user, function(product) {
        return $('<main>')
      // .attr('id', 'product.id')
        // .data('product', product)
        .addClass('row')
        .append($('<div id='+product.id+'>').addClass('col-sm-2')
        // .attr('id', 'product.id')
        // .data('product', product)
        .append(makeImageTag("img/product/thumbs/" + product.image)))
        .attr('id', 'product.id')
        .data('product', product)
        .append($('<div>').addClass('col-sm-10').append(makeDetails(product.desc, product.price, product.stock)));
    })
}

function makeImageTag(url) {
    return $('<div>').append($('<img>').attr('src', url));
}

function makeDetails(desc, price, stock) {
        var container = $('<div>');
        if(stock < 10) {
            container.append($('<div>').addClass('desc').html(desc))
            .append($('<div>').addClass('price').html(price))
            .append($('<div>').addClass('stock').html(stock))
            .append($('<div>ALMOST OUT OF STOCK</div>'));
        } else {
            container.append($('<div>').addClass('desc').html(desc))
            .append($('<div>').addClass('price').html(price))
            .append($('<div>').addClass('stock').html(stock));
        }
        return container;
}


// function filterButton(user) {
//     $('.navbar').append('<div class="myDropDown">');
//     $('.myDropDowm').append('<button class="dropbtn">Dropdown</button>');
//     $('.myDropDowm').append('<div id="myDropdown" class="dropdown-content">');
//     $('.dropbtn').on('click', function(event) {
//         var dropdowns = document.getElementsByClassName("dropdown");
//             for (var i = 0; i < dropdowns.length; i++) {
//                 var openDropdown = dropdowns[i];
//                 if (openDropdown.classList.contains('show')) {
//                     openDropdown.classList.remove('show');

//             }

//         }
//     });
//     $('.dropbtn').on('click', function(event) {
    
//     });
// }

function search(coll, target) {
    return coll.reduce(coll, function (output, value) {
        if(isComplex(value)) {
            if(search(value, target).length) {
                output.push(value);
            }
        } else if(typeof value === 'string') {
            if(value.toLowerCase().indexOf(target.toLowerCase()) > -1) {
                output.push(value);
            }
        }
        return output;
    }, []);
}

function isComplex(value) {
    if(Array.isArray(value)) return true;
    if(typeof value === 'object' && value !== null && value instanceof Date === false) return true;
    return false;
}

function filter(coll, test) {
    var output = [];
    coll.each(coll, function(value) {
        
    })
}


}

// function filterButton(user) {
//   return $.map(user, function(product) {
//   $.ajax({
//       type: "GET",
//       url: 'http://localhost:1738/product/' + product.id + '/info',
//       success: function(info) {
//       if ($("a[href*=#" + info.type.name + "]").length === 0) {
          
//       }
  
  
  
  
  
  
  
  
  
  
//       }
//   });
    
// });
// }
/*function to check userid & password*/
// function check(form) {
//  /*the following code checkes whether the entered userid and password are matching*/
//   if(form.userid.value === "myuserid" && form.pswrd.value === "mypswrd") {
//     window.open('target.html')/*opens the target page while Id & password matches*/
//   } else {
//     alert("Bad Credentials")/*displays error message*/
//   }
// }

/*function to check userid & password*/
function check(pw) {
 /*the following code checkes whether the entered userid and password are matching*/
  if(pw.username === "myuserid" && pw.password === "mypswrd") {
    window.open('target.html')/*opens the target page while Id & password matches*/
  } else {
    alert("Bad Credentials")/*displays error message*/
  }
}