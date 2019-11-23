/**
 * Remoção de um registo de um ficheiro presente na base de dados.
 * @param id Identificador do registo de um ficheiro presente na base de dados.
 */
let remove = (id) => {
    axios.delete(`/api/file/${id}`)
        .then((response) => {
            window.location.assign("/")
        })
        .catch((error) => {
            console.log(`Erro: ${error}`)
        })
}

/**
 * Método que exibe a informação do ficheiro JSON relativo a um registo de um ficheiro presente na base de dados.
 * @param f 
 */
let showInfo = (f) => {
    return $(`<pre>${JSON.stringify(f, null, 4)}</pre>`)
}

/**
 * Método que exibe a informação de um determinado ficheiro para o cliente.
 * @param f 
 */
let showFile = (f) => {
    let type = f.mimeType.split("/")[0]
    if (type == "image") {
        var file = $(`<img src="/files/${f.name}" width="100%"/>`)
        var download = $(`<br><br><div><a href="/download/${f.name}">Download</a></div>`)
    } else {
        var file = showInfo(f)
        var download = $(`<div><a href="/download/${f.name}">Download</a></div>`)
    }
    $("#display").empty()
    $("#display").append(file, download)
    $("#display").modal()
}

$(() => {
    let count = 1

    $("#adicionar").click(e => {
        e.preventDefault()
        count++

        let campo = $("<div></div>", { class: "w3-container", id: "f" + count })
        let desc = $("<div></div>", { class: "w3-cell-row", id: "desc" + count })
        let descLabel = $("<label class='w3-cell'>Descrição:</label>")
        let descInput = $("<input/>", { class: "w3-input w3-cell input", type: "text", name: "desc" }).prop("required", true)

        let ficheiro = $("<div></div>", { class: "w3-cell-row", id: "ficheiro" + count })
        let ficheiroLabel = $("<label class='w3-cell'>Ficheiro:</label>")
        let ficheiroInput = $("<input/>", { class: "w3-input w3-cell input", id: "inputFile", type: "file", name: "file" }).prop("required", true)

        $("#lista").append(campo)

        $(`#f${count}`).append(desc)
        $(`#desc${count}`).append(descLabel, descInput, "<br>")

        $(`#f${count}`).append(ficheiro)
        $(`#ficheiro${count}`).append(ficheiroLabel, ficheiroInput, "<br>")

        $("#remover").prop("disabled", false)
    })

    $("#remover").click(e => {
        e.preventDefault()
        if (count >= 2) {
            $("#f" + count).remove()
            count--
        }
    })

    $("#remover").hover(e => {
        e.preventDefault()
        if (count == 1) {
            $("#remover").prop("disabled", true)
        }
    })
})