document.addEventListener("DOMContentLoaded", () => {
    const texts = [
        { text: "Mood Indigo", language: "en" }, // English
        { text: "মুড ইন্ডিগো", language: "bn" }, // Bengali
        { text: "मूड इंडिगो", language: "hi" }, // Hindi
        { text: "Estado de ánimo índigo", language: "es" }, // Spanish
        { text: "Ambiance Indigo", language: "fr" }, // French
        { text: "Stimmung Indigo", language: "de" }, // German
        { text: "Indaco dell'umore", language: "it" }, // Italian
        { text: "Humor índigo", language: "pt" }, // Portuguese
        { text: "Настроение Индиго", language: "ru" }, // Russian
        { text: "Stemming Indigo", language: "nl" }, // Dutch
        { text: "Humör Indigo", language: "sv" }, // Swedish
        { text: "欢迎来到", language: "zh" }, // Chinese (Simplified)
        { text: "మూడ్ ఇండిగో", language: "te" }, // Catalan
        { text: "மனநிலை இண்டிகோ", language: "ta" }, // Tamil
        { text: "ムードインディゴ", language: "ja" }, // Japanese
        { text: "মুড ইণ্ডিগো", language: "bn" }, // Bengali
        { text: "ମୁଡ୍ ଇଣ୍ଡିଗୋ", language: "oe" }, // Croatian
        { text: "ਮੂਡ ਇੰਡੀਗੋ", language: "pa" } // Russian (Repeated)

    ];

    let currentIndex = 0;
    const randomTextElement = document.getElementById("moodi");

    // Character sets for different languages
    const charSets = {
        en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        es: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        es: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        de: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        it: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ja: 'あいうえおかきくけこさしすせそたちつてとへほまみむめもやゆよらりるれろわをん',
        ko: 'ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ',
        zh: '欢迎来到手田水口廿卜山戈人心日尸火土竹十大中長金金女月弓一',
        pt: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ru: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ',
        hi: 'अआइईउऊऋएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसहज्ञक्षश्र ',
        bn: 'অআইঈউঊএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎঋ ',
        nl: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fi: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        sv: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ca: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        da: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ta: 'அஆஇஈஉஊஎஏஐஒஓஔக஖஗஘ஙச஛ஜ஝ஞட஠஡஢ணத஥஦஧நப஫஬மயரலவஶஷஸஹளழவலஃஅஂஆஇஈஉஊஎஏஐஒஓஔ',
        te: 'అఆఇఈఉఊఋఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరలవశషసహళఴవలఃఅంఆఇఈఉఊఎఏఐఒఓఔ',
        as: 'অআইঈউঊএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎঋ',
        pa: 'ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵਸ਼਷ਸਹਲ਼਴ਵਲਃਅਂਆਇਈਉਊ਎ਏਐ਒ਓਔ',
        or: 'ଅଆଇଈଉଊଋଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଵଶଷସହଳ଴ଵଲଃଅଂଆଇଈଉଊ଎ଏଐ଒ଓଔ',
    };

    function getRandomChar(originalChar, lang) {
        const charSet = charSets[lang] || charSets['en'];
        if (/[a-zA-Z0-9\s]/.test(originalChar)) {
            let randomChar;
            do {
                randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
            } while (randomChar === originalChar);
            return randomChar;
        }
        return originalChar;
    }

    function blendCharacters(originalText, targetText, lang, callback) {
        const duration = 2000; // Duration of blending (1.3 seconds)
        const totalSteps = 28; // Number of blending steps
        const interval = duration / totalSteps; // Interval between steps
        let steps = 0;
        let currentText = randomTextElement.textContent || originalText;

        function blendStep() {
            if (steps < totalSteps) {
                let blendedText = currentText.split('').map((char, index) => {
                    if (index < targetText.length) {
                        return getRandomChar(targetText[index], lang);
                    }
                    return char;
                }).join('');
                randomTextElement.textContent = blendedText;
                steps++;
                setTimeout(blendStep, interval);
            } else {
                randomTextElement.textContent = targetText;
                setTimeout(callback, 1500); // Wait 1.5 seconds before moving to the next text
            }
        }

        blendStep();
    }

    function changeText() {
        const { text, language } = texts[currentIndex];
        currentIndex = (currentIndex + 1) % texts.length;

        blendCharacters(text, text, language, () => {
            setTimeout(changeText, 1000); // Keep the correct word displayed for 1 seconds before changing to the next
        });
    }

    changeText(); // Initial call to start the process
});

document.getElementById('moonstars').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});