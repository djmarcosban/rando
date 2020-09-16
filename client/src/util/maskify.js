import * as faceapi from "face-api.js"
import { getEspecificParam } from "./getparams";

const getOverlayValues = landmarks => {
  const nose = landmarks.getNose()
  const jawline = landmarks.getJawOutline()
  const jawLeft = jawline[0]
  const jawRight = jawline.splice(-1)[0]
  const adjacent = jawRight.x - jawLeft.x
  const opposite = jawRight.y - jawLeft.y
  const jawLength = Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2))
  const angle = Math.atan2(opposite, adjacent) * (180 / Math.PI)
  const width = jawLength * 2.2

  return {
    width,
    angle,
    leftOffset: jawLeft.x - width * 0.27,
    topOffset: nose[0].y - width * 0.47,
  }
}

function randomGenerator(low, high) {
  if (arguments.length < 2) {
    high = low;
    low = 0;
  }
  this.low = low;
  this.high = high;
  this.reset();
}

randomGenerator.prototype = {
  reset: function() {
    this.remaining = []
    for (var i = this.low; i <= this.high; i++) {
      this.remaining.push(i)
    }
  },
  get: function() {
    if (!this.remaining.length) {
      this.reset()
    }
    var index = Math.floor(Math.random() * this.remaining.length)
    var val = this.remaining[index]
    this.remaining.splice(index, 1)
    return val
  }
}

const oculosParam = getEspecificParam('oculos').split(",")
const oculosParamLengthLoss = Math.floor(oculosParam.length - 1)

var r = new randomGenerator(0, oculosParamLengthLoss)

const getRandomMask = masks => {
  //const index = Math.floor(masks.length * Math.random())
  const index = r.get()
  return masks[index]
}


export async function maskify(masks) {
  console.log("Debug: analisando")
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
  ]).catch(error => {
    console.error(error)
  })

  const items = document.querySelectorAll(".grid-item")

  items.forEach(async item => {
    const originalImage = item.querySelector("img")
    const scale = originalImage.width / originalImage.naturalWidth

    const handleImage = (oldImage, newImage) => async () => {
      const detection = await faceapi
        .detectSingleFace(newImage, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true)

      if (!detection) {
        return
      }

      const overlayValues = getOverlayValues(detection.landmarks)
      const overlay = document.createElement("img")

      overlay.src = getRandomMask(masks)
      overlay.alt = ""
      overlay.style.cssText = `
        position: absolute;
        left: ${overlayValues.leftOffset * scale}px;
        top: ${overlayValues.topOffset * scale}px;
        width: ${overlayValues.width * scale}px;
        transform: rotate(${overlayValues.angle}deg);
      `
      item.appendChild(overlay)
      console.log('Debug: renderizado')
    }

    const image = new Image()

    image.crossOrigin = "Anonymous"
    image.addEventListener("load", handleImage(originalImage, image))
    image.src = originalImage.src
  })
}
