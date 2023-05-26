let URL;
const urlMale = "https://teachablemachine.withgoogle.com/models/asWXL5hPQH/";
const urlFemale = "https://teachablemachine.withgoogle.com/models/asWXL5hPQH/";
let model, webcam, labelContainer, maxPredictions;
async function init() {
    if (document.getElementById("gender").checked) {
        URL = urlMale;
    } else {
        URL = urlFemale;
    }
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        var element = document.createElement("div")
        element.classList.add("d-flex");
        labelContainer.appendChild(element);
    }
}
async function predict() {
    var image = document.getElementById("face-image")
    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    console.log(prediction[0].className);
    var resultTitle, resultExplain, resultCeleb;
    if (document.getElementById("gender").checked) {
        gtag('event', '동물상 테스트 수행', {
            'event_category': '동물상 테스트 수행',
            'event_label': '남자'
        });
        switch (prediction[0].className) {
            case "spring":
                resultTitle = "봄"
                resultExplain = ""
                resultCeleb = "따뜻하고 부드러운 느낌의 봄톤"
                gtag('event', '남자 결과 봄톤', {'event_category': '남자 결과'});
                break;
            case "summer":
                resultTitle = "여름"
                resultExplain = ""
                resultCeleb = "여름 밤의 서늘한 분위기의 봄톤"
                gtag('event', '남자 결과 여름톤', {'event_category': '남자 결과'});
                break;
            case "autumn":
                resultTitle = "가을"
                resultExplain = ""
                resultCeleb = "시크하지만 잔잔한 감성의 가을톤"
                gtag('event', '남자 결과 가을톤', {'event_category': '남자 결과'});
                break;
            case "winter":
                resultTitle = "겨울"
                resultExplain = ""
                resultCeleb = "심플하면서 차가운 매력의 겨울"
                gtag('event', '남자 결과 겨울톤', {'event_category': '남자 결과'});
                break;
            default:
                resultTitle = "알수없음"
                resultExplain = ""
                resultCeleb = ""
                gtag('event', '남자 결과 알수없음', {'event_category': '남자 결과'});
        }
    } else {
        gtag('event', '테스트 수행', {
            'event_category': '테스트 수행',
            'event_label': '여자'
        });
        switch (prediction[0].className) {
            case "spring":
                resultTitle = "봄"
                resultExplain = ""
                resultCeleb = "따뜻하고 부드러운 느낌의 봄톤"
                gtag('event', '여자 결과 봄톤', {'event_category': '여자 결과'});
                break;
            case "summer":
                resultTitle = "여름"
                resultExplain = ""
                resultCeleb = "여름 밤의 서늘한 분위기의 봄톤"
                gtag('event', '여자 결과 여름톤', {'event_category': '여자 결과'});
                break;
            case "autumn":
                resultTitle = "가을"
                resultExplain = ""
                resultCeleb = "시크하지만 잔잔한 감성의 가을톤"
                gtag('event', '여자 결과 가을톤', {'event_category': '여자 결과'});
                break;
            case "winter":
                resultTitle = "겨울"
                resultExplain = ""
                resultCeleb = "심플하면서 차가운 매력의 겨울"
                gtag('event', '여자 결과 겨울톤', {'event_category': '여자 결과'});
                break;
            default:
                resultTitle = "알수없음"
                resultExplain = ""
                resultCeleb = ""
        }
    }
    var title = "<div class='" + prediction[0].className + "-title'>" + resultTitle + "</div>"
    var explain = "<div class='-explain pt-2'>" + resultExplain + "</div>"
    var celeb = "<div class='" + prediction[0].className + "celeb pt-2 pb-2'>" + resultCeleb + "</div>"
    $('.result-message').html(title + explain + celeb );
    var barWidth;
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > 0.1) {
            barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        } else if (prediction[i].probability.toFixed(2) >= 0.01) {
            barWidth = "4%"
        } else {
            barWidth = "2%"
        }
        var labelTitle;
        switch (prediction[i].className) {
            case "spring":
                labelTitle = "봄톤"
                break;
            case "summer":
                labelTitle = "여름톤"
                break;
            case "autumn":
                labelTitle = "가을톤"
                break;
            case "winter":
                labelTitle = "겨울톤"
                break;
            default:
                labelTitle = "알수없음"
        }
        var label = "<div class='label d-flex align-items-center'>" + labelTitle + "</div>"
        var bar = "<div class='bar-container position-relative container'><div class='" + prediction[i].className + "-box'></div><div class='d-flex justify-content-center align-items-center " + prediction[i].className + "-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) + "%</span></div></div>"
        labelContainer.childNodes[i].innerHTML = label + bar;
    }
}