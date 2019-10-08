/**
 * @author : akshatjain
 */

 //CU Form Instance
const cuForm = $("#cu-form")
const baseBEURL = '/api/'
var selectedID = 0

//Open Modal when Create Button Image is clicked...
$("#create-band").click(() => {
    $(".modal-title").html("Create Band")
    cuForm.find("input[type=submit]").val("Create")
    $("#ip-band-name").val("")
    $("#ip-band-desc").html("")
    $(".modal").modal('show')
})

//Open Modal when Update Button Image is clicked...
function editBand(id) {
    selectedID = id
    $(".modal-title").html("Update Band")
    $.ajax({
        type: "GET",
        url: baseBEURL + "band/" + selectedID,
        contentType: 'application/json',
        headers: {
            'Authorization': getAuthToken()
        },
        success: response => {
            let jObj = JSON.parse(JSON.stringify(response))

            $("#ip-band-name").val(jObj.bandName)
            $("#ip-band-desc").html(jObj.bandDesc)

            cuForm.find("input[type=submit]").val("Update")
            $(".modal").modal('show')
        },
        error: (err) => {
            alert(err.responseJSON.error)
            location.reload()
        }
    })
}

//Create/Update Form Submission Event handler
cuForm.submit((e) => {
    e.preventDefault();

    let bandName = $("#ip-band-name").val()
    let bandDesc = $("#ip-band-desc").val()
    let eventType = $("input[type=submit]").val()

    let url, type

    if (eventType == "Create") {
        type = "POST"
        url = baseBEURL + "createband/"
    } else {
        type = "PUT"
        url = baseBEURL + "updateband/" + selectedID
        selectedID = 0
    }

    if (bandName.trim().length == 0 || bandDesc.trim().length == 0) {
        alert("Band Name/Desc Cannot Be Kept Empty")
    } else {
        let jObj = {
            bandName: bandName,
            bandDesc: bandDesc
        }
        //Apply The Ajax Here to Create/Upadte API/...
        $.ajax({
            type: type,
            url: url,
            data: JSON.stringify(jObj),
            contentType: 'application/json',
            headers: {
                'Authorization': getAuthToken()
            },
            success: (response) => {
                fetchBands()
            },
            error: (err) => {
                alert(err.responseJSON.error)
                location.reload()
            }
        })
    }
})

//Delete the Band Fn...
function deleteBand(id) {
    if (confirm('Are You Sure Delete Band ?')) {
        $.ajax({
            type: "DELETE",
            url: baseBEURL + "deleteband/" + id,
            headers: {
                'Authorization': getAuthToken()
            },
            success: (response) => {
                fetchBands()
            },
            error: (err) => {
                alert(err.responseJSON.error)
                location.reload()
            }
        })
    }
}

fetchBands()

//Fetch Tables From BE...
function fetchBands() {
    $.ajax({
        type: "GET",
        url: baseBEURL + "band/",
        headers: {
            'Authorization': getAuthToken()
        },
        success: function (response) {
            var jObj = JSON.parse(JSON.stringify(response))
            printTable(jObj)
        },
        error: (err) => {
            alert(err.responseJSON.error)
            location.reload()
        }
    })
    $(".modal").modal('hide')
}

function printTable(bands) {
    var tableToApend = ''
    let i = 1;
    $('#bands-tbl').html('')
    bands.forEach(band => {
        tableToApend = createTableRow(i++, band.bandName, band.bandDesc, band.bandID)
        $('#bands-tbl').append(tableToApend)
    })
}

function createTableRow(sno, bandName, bandDesc, bandID) {
    return $("<tr>")
        .addClass("table-light")
        .append(
            $("<th>")
            .text(sno)
        )
        .append(
            $("<td>")
            .text(bandName)
        )
        .append(
            $("<td>")
            .text(bandDesc)
        )
        .append(
            createEditDelBtns(bandID)
        )
}

function createEditDelBtns(bandID) {
    return $("<td>")
        .append(
            $('<img>')
            .attr('onclick', `editBand(${bandID})`)
            .attr('src', '/img/edit-icon.png')
        )
        .append(
            $('<img>')
            .attr('onclick', `deleteBand(${bandID})`)
            .attr('style', 'margin-left: 0.7em')
            .attr('src', '/img/delete-icon.png')

        )

}


function getAuthToken() {
    let auth_jwt = decodeURIComponent(getCookie("username_jwt"))
    if (auth_jwt == null) {
        window.location.replace("/")
    }
    return auth_jwt
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}