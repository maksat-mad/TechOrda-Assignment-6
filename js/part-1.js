const videoElement = document.getElementById('video');
const canvas = document.getElementById('canvas');
const start = document.getElementById('start-video');
const stop = document.getElementById('stop-video');

canvas.height = videoElement.videoHeight;
canvas.width = videoElement.videoWidth;

start.addEventListener('click', e => startVideo());
stop.addEventListener('click', e => stopVideo());

function startVideo() {
    start.style.display = "none";
    stop.style.display = "block";

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
            videoElement.srcObject = stream;
            videoElement.play();
            blurVideo();
        })
        .catch(error => {
            start.style.display = "block";
            stop.style.display = "none";
            console.error(error);
        });
}

function stopVideo() {
    start.style.display = "block";
    stop.style.display = "none";

    videoElement.style.display = "block";
    canvas.style.display = "none";

    const stream = videoElement.srcObject;
    stream.getTracks().forEach(track => track.stop());
    videoElement.srcObject = null;
}

function blurVideo() {
    videoElement.style.display = "none";
    canvas.style.display = "block";

    options = {
        multiplier: 0.75,
        stride: 32,
        quantBytes: 4
    }
    bodyPix.load(options)
        .then(async net => {
            while (start.style.display === 'none') {
                const segmentation = await net.segmentPerson(video);

                const backgroundBlurAmount = 26;
                const edgeBlurAmount = 2;
                const flipHorizontal = false;

                bodyPix.drawBokehEffect(
                    canvas, videoElement, segmentation, backgroundBlurAmount,
                    edgeBlurAmount, flipHorizontal);
            }
        })
        .catch(error => console.error(error));
}