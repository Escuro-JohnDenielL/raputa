$(document).ready(function() {
    $(document).ready(function() {
    const apiUrl = 'https://memoirverse.site/Backend/Escuro/api.php';

    function fetchAlbums() {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                let albums = data.trim().split('\n').filter(line => line.length > 0).map(line => {
                    let [id, name, band, release_date, genre] = line.split(',');
                    return {id, name, band, release_date, genre};
                });
                let table = $('#bandTable tbody');
                table.empty();
                albums.forEach(album => {
                    let row = $('<tr>');
                    row.append($('<td>').text(album.id));
                    row.append($('<td>').text(album.name));
                    row.append($('<td>').text(album.band));
                    row.append($('<td>').text(album.release_date));
                    row.append($('<td>').text(album.genre));
                    let actions = $('<td>');
                    actions.append($('<button>').text('Edit').click(function() {
                        $('#id').val(album.id);
                        $('#name').val(album.name);
                        $('#band').val(album.band);
                        $('#release_date').val(album.release_date);
                        $('#genre').val(album.genre);
                    }));
                    actions.append($('<button>').text('Delete').click(function() {
                        $.ajax({
                            url: apiUrl,
                            method: 'DELETE',
                            data: { id: album.id },
                            success: function() {
                                fetchAlbums();
                            }
                        });
                    }));
                    row.append(actions);
                    table.append(row);
                });
            }
        });
    }

    $('#bandForm').on('submit', function(e) {
        e.preventDefault();

        let album = {
            id: $('#id').val(),
            name: $('#name').val(),
            band: $('#band').val(),
            release_date: $('#release_date').val(),
            genre: $('#genre').val()
        };

        let method = album.id ? 'PATCH' : 'POST';

        $.ajax({
            url: apiUrl,
            method: method,
            data: album,
            success: function() {
                fetchAlbums();
                $('#bandForm')[0].reset();
            }
        });
    });

    fetchAlbums();
});

    function fetchAlbums() {
        $.ajax({
            url: 'api.php',
            method: 'GET',
            success: function(data) {
                let albums = data.trim().split('\n').filter(line => line.length > 0).map(line => {
                    let [id, name, band, release_date, genre] = line.split(',');
                    return {id, name, band, release_date, genre};
                });
                let table = $('#bandTable tbody');
                table.empty();
                albums.forEach(album => {
                    let row = $('<tr>');
                    row.append($('<td>').text(album.id));
                    row.append($('<td>').text(album.name));
                    row.append($('<td>').text(album.band));
                    row.append($('<td>').text(album.release_date));
                    row.append($('<td>').text(album.genre));
                    let actions = $('<td>');
                    actions.append($('<button>').text('Edit').click(function() {
                        $('#id').val(album.id);
                        $('#name').val(album.name);
                        $('#band').val(album.band);
                        $('#release_date').val(album.release_date);
                        $('#genre').val(album.genre);
                    }));
                    actions.append($('<button>').text('Delete').click(function() {
                        $.ajax({
                            url: 'api.php',
                            method: 'DELETE',
                            data: { id: album.id },
                            success: function() {
                                fetchAlbums();
                            }
                        });
                    }));
                    row.append(actions);
                    table.append(row);
                });
            }
        });
    }

    $('#bandForm').on('submit', function(e) {
        e.preventDefault();

        let album = {
            id: $('#id').val(),
            name: $('#name').val(),
            band: $('#band').val(),
            release_date: $('#release_date').val(),
            genre: $('#genre').val()
        };

        let method = album.id ? 'PATCH' : 'POST';

        $.ajax({
            url: 'api.php',
            method: method,
            data: album,
            success: function() {
                fetchAlbums();
                $('#bandForm')[0].reset();
            }
        });
    });

    fetchAlbums();
});
