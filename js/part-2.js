const modal = document.getElementById("myModal");
const btn = document.getElementById("open-modal");
const span = document.getElementsByClassName("close")[0];

const file = document.getElementById("file");
const uploadButton = document.getElementById("upload");
const success = document.getElementById("success-message");
const error = document.getElementById("error-message");
const uploadMessage = document.getElementById("upload-message");

const scamDir = document.getElementById("scammed");
const scamPhotos = document.getElementById("scam-photos");
const uploadText = document.getElementById("upload-text");

const secret = document.getElementsByClassName("secret")[0];

const input = document.querySelector('input');

const messages = [
    {'text': 'Енді мамаң үшін тағы upload жаса ', 'code': 128522, 'close': false},
    {'text': 'Папаң үшін тағы бір upload жаса ', 'code': 128526, 'close': false},
    {'text': 'Жарайсың, енді соңғы рет тағы бір upload жаса\nҚызық болады ', 'code': 128540, 'close': false},
    {'text': 'Error ', 'code': 128543, 'close': true}
];
const photos = [
    {'src': './assets/scammed.jfif'},
    {'src': './assets/big-brother.jpg'}
];
let index = 0;

btn.addEventListener("click", e => {
    modal.style.display = "block";
    success.style.display = "none";
    success.style.display = "none";
});

span.addEventListener("click", e => {
    success.style.display = "none";
    error.style.display = "none";
    input.value = '';
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) {
        success.style.display = "none";
        error.style.display = "none";
        input.value = '';
        modal.style.display = "none";
    }
});

function uploadFile(object) {
    return new Promise(((resolve, reject) => {
        file.files.length === 0 ? reject() : resolve(object);
    }));
}

function scammed(photos) {
    const promise = new Promise(resolve => resolve());

    promise
        .then(() => {
            scamDir.style.display = "block";
            scamPhotos.innerHTML = `<img src=${photos[0].src} style="width: 450px; height=450px;" alt="you got scammed">`;
            btn.style.display = "none";
            secret.style.display = "none";
            uploadText.innerText = "You got scammed";
            uploadText.style.color = '#10559A';
        })
        .then(() => {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 5000);
            });
        })
        .then(() => {
            uploadText.innerText = "Got YOU";
            scamPhotos.innerHTML = `<img src=${photos[1].src} style="width: 450px; height=450px;" alt="you got scammed">`;
        })
        .then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    scamPhotos.innerHTML = "";
                    scamDir.style.display = "none";
                    btn.style.display = "block";
                    secret.style.display = "block";
                    uploadText.innerText = "Upload file by clicking this button";
                    uploadText.style.color = 'black';
                    resolve();
                }, 5000);
            });
        })
}

uploadButton.addEventListener("click", async e => {
    if (file.files.length !== 0 && messages[index].close) {
        modal.style.display = "none";
        document.getElementById("entertain-message").style.display = "none";
        index = 0;
        scammed(photos);
    } else {
        await uploadFile(messages[index])
            .then((object) => {
                error.style.display = "none";
                success.style.display = "block";

                document.getElementById("entertain-message").style.display = "block";
                uploadMessage.innerText = object.text + String.fromCodePoint(object.code);
                index++;
            })
            .catch(() => {
                success.style.display = "none";
                error.style.display = "block";
            });
    }
    input.value = '';
});

input.addEventListener('input', e => {
    success.style.display = "none";
    error.style.display = "none";
});