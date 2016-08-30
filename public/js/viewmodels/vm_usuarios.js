var vm = (function() {
    "use strict";

    var novoUsuario = new Usuario("", "", "", "", "", "");

    var limparNovoUsuario = function() {
        novoUsuario.id("");
        novoUsuario.nome("");
        novoUsuario.email("");
        novoUsuario.email_conf("");
        novoUsuario.senha("");
        novoUsuario.senha_conf("");
    }

    var addUsuario = function(data) {
        var id = "";
        var usuario = Usuario(
            id,
            data.nome(),
            data.email(),
            data.email_conf(),
            data.senha(),
            data.senha_conf()
        );
        catalog.push(product);
        clearNewProduct();
        console.log(product);
    };

    var searchTerm = ko.observable("");

    var filteredCatalog = ko.computed(function() {
        //if catalog is empty return empty array
        if (!catalog()) {
            return [];
        }
        var filter = searchTerm().toLowerCase();
        //if filter is empty return all the catalog
        if (!filter) {
            return catalog();
        }
        //filter data
        var filtered = ko.utils.arrayFilter(catalog(), function(item) {
            var fields = ["name"]; //we can filter several properties
            var i = fields.length;
            while (i--) {
                var prop = fields[i];
                var strProp = ko.unwrap(item[prop]).toLocaleLowerCase();
                if (strProp.indexOf(filter) !== -1) {
                    return true;
                }
            }
            return false;
        });
        return filtered;
    });

    return {
        searchTerm: searchTerm,
        catalog: filteredCatalog,
        newProduct: newProduct,
        addProduct: addProduct
    };
})();

ko.applyBindings(vm);