$(function() {
    var searchCont = $("#act_cont");
    var input = $(".act__form input");
    var key = '3862937-3692798350ef552cae4c3931e';

    function search(init) {
        searchCont.html('');
        init || searchCont.masonry('destroy');

        var searchQuery = input.val().trim().replace(/\s+/g, '+');
        var url =
            "https://pixabay.com/api/?key=" + key + "&q=" +
            searchQuery + "&per_page=7";

        $.ajax({
                url: url,
                dataType: 'jsonp'
            })
            .success(function(data) {
                if (data.totalHits == 0) {
                    searchCont.html(
                        "Sorry, we could'nt find any image on your request:(");
                    return;
                }

                var template = $("#masonry-template").html();
                var newData = tmpl(template, {
                    data: data
                });

                searchCont.append(newData);
                searchCont.masonry({
                    itemSelector: '.masonry__cont',
                    columnWidth: '.masonry__cont'
                });
            });

        input.val("");
    }

    $('#search-btn').on('click', function(e) {
        e.preventDefault();
        search();
    });

    input.val("rest+holiday");
    search(true);
});
