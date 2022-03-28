$(document).ready(function () {

    let chirps = [];
    let user;
    let text;

    // handle API request (api call below) the server responds with a nested object of chirps
    function handleResponse(data) {
        // change object into array of objects for iteration
        let entries = Object.entries(data)
        // destructure entries array & extract user, text, id in an object to chirps array
        for (const [id, data] of entries) {
            chirps.push({
                "user": `${data.user}`,
                "text": `${data.text}`,
                "id": `${id}`
            });
        }

        // remove 'nextid' element in array
        chirps.pop();
        // map over array, for each object in the array ...
        chirps.map(chirp => {
            // create a delete button for each chirp, set class
            let x = $('<button>x</button>').attr('class', 'delete')
            // create paragraph containing user and text for each chirp
            // set a class for styling, set id, set attributes for modal
            let p = $(`<p>${chirp.user}: ${chirp.text}</p>`).attr({
                class: "chirps",
                id: `${chirp.id}`,
                "data-toggle": "modal",
                "data-target": "#exampleModalCenter"
            // append delete button to each paragraph
            }).append(x)
            // append each modal/paragraph to div
            $('.current').append(p)
        })
    }

    // use get request to call api
    $.get('http://127.0.0.1:3000/api/chirps').then(handleResponse).catch(err => console.log(err));      // or use localhost:3000

    // on submit button click, get the value of user inputs and ...
    $('#submit').click(() => {
        user = $('#user').val();
        text = $('#text').val();
        // make a post request with those values
        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:3000/api/chirps/',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "user": `${user}`,
                "text": `${text}`,
            })
        }).catch(err => console.log(err));
    })

    // on delete button click
    $(document).on("click", ".delete", event => {
        event.stopPropagation()
        // set variable for the button's parent (the chirp)
        let chirpToDelete = $(event.target).parent()
        // remove html chirp from display
        chirpToDelete.remove()
        // also send delete request to remove from server
        $.ajax({
            type: "DELETE",
            url: `http://127.0.0.1:3000/api/chirps/${chirpToDelete.attr('id')}`
        }).catch(err => console.log(err))
    })

    // on modal paragraph click, send id to modal
    $(document).on("click", "p", event => {
        let putid = $(event.target).attr('id')
        $(".save").attr('id', putid)
    })

    // on save changes click in modal
    $(".save").click(() => {
        // set variables for chirp entry
        user = $('#newuser').val();
        text = $('#newtext').val();
        let id = $(".save").attr("id")

        // make a put request with entry values & id (from 2 onclicks above)
        $.ajax({
            type: "PUT",
            url: `http://127.0.0.1:3000/api/chirps/${id}`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "user": `${user}`,
                "text": `${text}`,
            })
        })
            .then(() => { $("#exampleModalCenter").modal('hide') })
            .then(() => location.reload())
            .catch(err => console.log(err));
    })
})