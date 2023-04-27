$('document').ready(function () {
    const amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        $('.amenities H4').text(Object.values(amenities).join(', '));
    });

    const url = 'http://0.0.0.0:5001/api/v1/places_search/';
    $('button').click(function () {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: url,
            data: JSON.stringify({ amenities: Object.keys(amenities) }),
            dataType: 'json',
            success: function (data) {
                $('section.places').empty();
                for (const place of data) {
                    const article = [
                        '<article>',
                        '<div class="title">',
                        `<h2>${place.name}</h2>`,
                        '<div class="price_by_night">',
                        `$${place.price_by_night}`,
                        '</div>',
                        '</div>',
                        '<div class="information">',
                        `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
                        `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
                        `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
                        '</div>',
                        `<div class="description">${place.description}</div>`,
                        '</article>'
                    ].join('');
                    $('section.places').append(article);
                }
            }
        });
    });

    // Task 3 - API status

    $(document).ready(function () {
        $.get('http://localhost:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
                $('div#api_status').addClass('available');
            }
        }).fail(function () {
            $('div#api_status').removeClass('available');
        });
    });
});
