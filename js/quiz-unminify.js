// Simplified Quiz Script with Timer
document.addEventListener('DOMContentLoaded', function() {
    const TOTAL_QUESTIONS = 110;
    const TOTAL_TIMER_DURATION = 660;
    let timerInterval = null;
    let timeLeft = TOTAL_TIMER_DURATION;
    const LOW_TIME_THRESHOLD = 10;
    const QUIZ_QUESTIONS = [
    { question: "खाटू श्याम जी का मंदिर राजस्थान के किस जिले में स्थित है?", options: ["सीकर", "जयपुर", "जोधपुर", "उदयपुर"], correct: 0 },
    { question: "खाटू श्याम जी का मूल नाम क्या था?", options: ["भीम", "अभिमन्यु", "अर्जुन", "बर्बरीक"], correct: 3 },
    { question: "खाटू श्याम जी को कलियुग में किस देवता का अवतार माना जाता है?", options: ["विष्णु", "राम", "कृष्ण", "शिव"], correct: 2 },
    { question: "बर्बरीक के पिता का नाम क्या था?", options: ["अर्जुन", "भीम", "कर्ण", "घटोत्कच"], correct: 3 },
    { question: "बर्बरीक की माता का नाम क्या था?", options: ["अहिलावती", "द्रौपदी", "हिडिम्बा", "सुभद्रा"], correct: 0 },
    { question: "खाटू श्याम जी को 'हारे का सहारा' क्यों कहा जाता है?", options: ["वे सहारा मांगते हैं", "वे हरा रंग पसंद करते हैं", "वे हारने वालों का साथ देते हैं", "वे युद्ध में हार जाते हैं"], correct: 2 },
    { question: "बर्बरीक ने महाभारत युद्ध में किस पक्ष का समर्थन करने की प्रतिज्ञा ली थी?", options: ["कौरवों का", "पांडवों का", "हारने वाले पक्ष का", "किसी का नहीं"], correct: 2 },
    { question: "बर्बरीक को भगवान शिव से कितने अचूक बाण प्राप्त हुए थे?", options: ["एक", "दो", "चार", "तीन"], correct: 3 },
    { question: "बर्बरीक ने अपना शीश किसे दान किया था?", options: ["भीम को", "कृष्ण को", "अर्जुन को", "युधिष्ठिर को"], correct: 1 },
    { question: "बर्बरीक का शीश युद्ध देखने के लिए कहाँ रखा गया था?", options: ["कृष्ण के रथ पर", "पहाड़ी पर", "कुरुक्षेत्र के मैदान पर", "द्रौपदी के पास"], correct: 1 },
    { question: "खाटू श्याम जी का शीश खाटू में कैसे प्रकट हुआ?", options: ["एक ब्राह्मण को", "एक स्वप्न में", "एक गाय के दूध से", "खुदाई के दौरान"], correct: 3 },
    { question: "खाटू श्याम मंदिर का मूल निर्माण किस वर्ष हुआ था?", options: ["1720 ईस्वी", "1500 ईस्वी", "1900 ईस्वी", "1027 ईस्वी"], correct: 3 },
    { question: "मंदिर का जीर्णोद्धार किसने करवाया था?", options: ["अभय सिंह", "नर्मदा कंवर", "रूप सिंह चौहान", "ठाकुर केशरी सिंह"], correct: 0 },
    { question: "बर्बरीक को श्याम नाम किसने दिया?", options: ["अर्जुन ने", "भीम ने", "शिव ने", "कृष्ण ने"], correct: 3 },
    { question: "बर्बरीक की शक्ति का मुख्य स्रोत क्या था?", options: ["कृष्ण की कृपा", "भीम का आशीर्वाद", "देवी की उपासना", "अर्जुन का प्रशिक्षण"], correct: 2 },
    { question: "खाटू श्याम जी का विग्रह किस प्रकार का है?", options: ["पूर्ण मूर्ति", "हस्त प्रतिमा", "पाद प्रतिमा", "शीश प्रतिमा"], correct: 3 },
    { question: "खाटू श्याम मंदिर में प्रतिवर्ष कितने श्रद्धालु आते हैं?", options: ["50 लाख", "10 लाख", "1 करोड़", "90 लाख"], correct: 3 },
    { question: "खाटू श्याम जी का जन्मोत्सव कब मनाया जाता है?", options: ["दिवाली पर", "फाल्गुन शुक्ल एकादशी पर", "कार्तिक शुक्ल एकादशी पर", "जन्माष्टमी पर"], correct: 1 },
    { question: "मंदिर का प्रबंधन कौन करता है?", options: ["चौहान समाज", "श्री श्याम मंदिर कमेटी", "राजस्थान सरकार", "सीकर जिला प्रशासन"], correct: 1 },
    { question: "श्याम ध्वज कहाँ से लाया जाता है?", options: ["सीकर से", "जयपुर से", "झुंझुनू से", "सूरजगढ़ से"], correct: 3 },
    { question: "श्याम ध्वज पर क्या चित्र अंकित होता है?", options: ["पीला कमल", "नीला घोड़ा", "लाल स्वास्तिक", "हरा पेड़"], correct: 1 },
    { question: "खाटू श्याम मंदिर जयपुर से कितनी दूरी पर है?", options: ["80 किमी", "120 किमी", "50 किमी", "100 किमी"], correct: 0 },
    { question: "खाटू श्याम मंदिर का नजदीकी रेलवे स्टेशन कौन सा है?", options: ["जयपुर", "सीकर", "चूरू", "रींगस"], correct: 3 },
    { question: "मंदिर कब खुलता है?", options: ["शाम 5 बजे", "सुबह 4:30 बजे", "सुबह 6 बजे", "दोपहर 12 बजे"], correct: 1 },
    { question: "मंगला आरती का समय क्या है?", options: ["सुबह 4:45 बजे", "शाम 7:30 बजे", "दोपहर 12:15 बजे", "रात 9 बजे"], correct: 0 },
    { question: "श्याम कुंड क्या है?", options: ["ध्वज स्थापना स्थल", "प्रसाद वितरण स्थल", "आरती स्थल", "मंदिर का पवित्र तालाब"], correct: 3 },
    { question: "मंदिर की दीवारें किस सामग्री से बनी हैं?", options: ["लकड़ी से", "कंक्रीट से", "लाइम मोर्टार और संगमरमर से", "ईंटों से"], correct: 2 },
    { question: "मंदिर में फोटोग्राफी क्यों वर्जित है?", options: ["सुरक्षा कारणों से", "धार्मिक नियमों के अनुसार", "तकनीकी समस्या के कारण", "पर्यावरण संरक्षण के लिए"], correct: 1 },
    { question: "खाटू श्याम का बड़ा मेला कब लगता है?", options: ["होली पर", "कार्तिक शुक्ला पर", "जन्माष्टमी पर", "फाल्गुन एकादशी पर"], correct: 3 },
    { question: "जन्माष्टमी के दिन मंदिर में क्या विशेष होता है?", options: ["आरती का विस्तार", "विशेष पूजा और अभिषेक", "ध्वज चढ़ाना", "मेला लगना"], correct: 1 },
    { question: "देवउठनी एकादशी का खाटू श्याम के संदर्भ में क्या महत्व है?", options: ["मेला दिवस", "प्राकट्य दिवस", "आरती दिवस", "जन्म दिवस"], correct: 1 },
    { question: "ग्यारस मेला कितने दिनों तक चलता है?", options: ["10 दिन", "3 दिन", "7 दिन", "5 दिन"], correct: 3 },
    { question: "श्याम बाग क्या है?", options: ["प्रसाद स्टॉल", "मंदिर का उद्यान", "आरती हॉल", "गौरीशंकर मंदिर"], correct: 1 },
    { question: "गौरीशंकर मंदिर खाटू श्याम मंदिर के सापेक्ष कहाँ स्थित है?", options: ["खाटू से दूर", "सीकर में", "मुख्य मंदिर के पास", "जयपुर में"], correct: 2 },
    { question: "मंदिर में प्रचलित मुख्य भाषाएँ कौन-सी हैं?", options: ["केवल हिंदी", "अंग्रेजी", "हरियाणवी", "हिंदी और राजस्थानी"], correct: 3 },
    { question: "खाटू श्याम मंदिर कमेटी के वर्तमान अध्यक्ष कौन हैं?", options: ["रूप सिंह", "पृथ्वी सिंह चौहान", "अभय सिंह", "कालू सिंह"], correct: 1 },
    { question: "खाटू श्याम मंदिर की आधिकारिक वेबसाइट क्या है?", options: ["www.khatu-shyam.com", "www.khatu.org", "www.shyamji.org", "www.sikartemple.com"], correct: 0 },
    { question: "श्याम चालीसा में कुल कितनी चौपाइयाँ हैं?", options: ["20", "40", "50", "30"], correct: 1 },
    { question: "श्याम चालीसा के रचयिता कौन माने जाते हैं?", options: ["कबीर", "तुलसीदास", "अज्ञात या परंपरागत", "सूरदास"], correct: 2 },
    { question: "श्याम चालीसा का प्रारंभिक दोहा क्या कहता है?", options: ["हारे का सहारा", "श्री गुरु चरणन ध्यान धर", "जय जय श्याम बाबा", "श्याम श्याम भजि"], correct: 1 },
    { question: "श्याम चालीसा में श्याम को किसके पौत्र के रूप में वर्णित किया गया है?", options: ["कर्ण के", "युधिष्ठिर के", "अर्जुन के", "भीम के"], correct: 3 },
    { question: "श्याम चालीसा में बर्बरीक को किस अवतार के रूप में कहा गया है?", options: ["शिव अवतार", "विष्णु अवतार", "देव अवतार", "राम अवतार"], correct: 1 },
    { question: "श्याम चालीसा पाठ का मुख्य लाभ क्या है?", options: ["भवसागर पार", "सभी", "धन प्राप्ति", "सुख मिलना"], correct: 1 },
    { question: "श्याम चालीसा में श्याम के कितने नामों का गुणगान किया गया है?", options: ["एक नाम", "कई नाम", "दो नाम", "तीन नाम"], correct: 1 },
    { question: "श्याम चालीसा में मुख्य रूप से कौन-सी कथा का वर्णन है?", options: ["शिव कथा", "राम कथा", "महाभारत कथा", "कल्पांतर कथा"], correct: 3 },
    { question: "श्याम चालीसा का अंतिम दोहा क्या व्यक्त करता है?", options: ["हारे का सहारा", "जय जय श्याम", "इच्छा पूर्ण भक्त की", "श्याम सलोने संवारे"], correct: 3 },
    { question: "श्याम चालीसा के पाठ से भक्त को क्या प्राप्त होता है?", options: ["निस्तार", "धन", "पुत्र", "सभी"], correct: 3 },
    { question: "श्याम चालीसा में श्याम को 'दीनबंधु' क्यों कहा गया है?", options: ["दीनों का बंधु होने के कारण", "दुख का बंधु", "देव का बंधु", "धन का बंधु"], correct: 0 },
    { question: "श्याम चालीसा में किसकी भक्ति का विशेष उल्लेख है?", options: ["भीलनी की", "कुंती की", "द्रौपदी की", "सुभद्रा की"], correct: 0 },
    { question: "श्याम चालीसा में अहिल्या का उल्लेख किस संदर्भ में है?", options: ["श्राप से मुक्ति के लिए", "दान देने के लिए", "विवाह के लिए", "यज्ञ में भाग लेने के लिए"], correct: 0 },
    { question: "श्याम चालीसा में अजामिल की कथा क्या सिखाती है?", options: ["दान का महत्व", "योग का महत्व", "नाम जप का महत्व", "तपस्या का महत्व"], correct: 2 },
    { question: "श्याम चालीसा में श्याम का स्वरूप कैसा वर्णित है?", options: ["पीला", "काला", "लाल", "सलोना सुंदर"], correct: 3 },
    { question: "श्याम चालीसा में मुरली के बजाने का वर्णन कैसे है?", options: ["बजाई गई", "चोरी हो गई", "नहीं बजाई गई", "टूटी हुई"], correct: 0 },
    { question: "श्याम चालीसा के लाभों में क्या शामिल नहीं है?", options: ["रोग नाश", "दुख दूर होना", "सभी शामिल हैं", "सुख प्राप्ति"], correct: 2 },
    { question: "श्याम चालीसा में श्याम को 'मोर मुकुट धारी' कहा गया है?", options: ["कभी-कभी", "हाँ", "नहीं", "नहीं"], correct: 1 },
    { question: "श्याम चालीसा का पाठ कब करना उचित माना जाता है?", options: ["शुक्रवार को", "सोमवार को", "नित्य", "मंगलवार को"], correct: 2 },
    { question: "श्याम चालीसा में कुल कितने दोहे हैं?", options: ["2", "1", "4", "3"], correct: 0 },
    { question: "खाटू श्याम जी को 'मोरछीधारी' क्यों कहा जाता है?", options: ["मोर नृत्य करने के कारण", "मोर पंख की छड़ी धारण करने के कारण", "मोर खाने के कारण", "मोर मंदिर में रहने के कारण"], correct: 1 },
    { question: "खाटू श्याम जी के अन्य प्रसिद्ध नाम क्या हैं?", options: ["सभी", "कलियुग का अवतार", "हारे का सहारा", "श्याम बाबा"], correct: 0 },
    { question: "खाटू श्याम को विश्व का दूसरा सर्वश्रेष्ठ धनुर्धर किसके बाद माना जाता है?", options: ["भीम के बाद", "अर्जुन के बाद", "कर्ण के बाद", "राम के बाद"], correct: 3 },
    { question: "खाटू श्याम शब्द का अर्थ क्या है?", options: ["हारे का सहारा", "श्याम बाबा", "खाटू का निवासी", "श्याम रंग वाला"], correct: 0 },
    { question: "क्या बर्बरीक घटोत्कच के पुत्र थे?", options: ["नहीं", "भीम के पुत्र", "हाँ", "अर्जुन के पुत्र"], correct: 2 },
    { question: "खाटू श्याम जी का जन्म दिवस कब मनाया जाता है?", options: ["फाल्गुन शुक्ल पर", "जन्माष्टमी पर", "होली पर", "देवउठनी एकादशी पर"], correct: 3 },
    { question: "खाटू श्याम जी को 'शीश दानी' क्यों कहा जाता है?", options: ["माता को शीश दान करने के कारण", "भाई को शीश दान करने के कारण", "कृष्ण को शीश दान करने के कारण", "पिता को शीश दान करने के कारण"], correct: 2 },
    { question: "महाभारत में बर्बरीक को वरदान किस देवता ने दिया?", options: ["भीम ने", "देवी ने", "कृष्ण ने", "अर्जुन ने"], correct: 1 },
    { question: "खाटू धाम का श्याम कुंड क्या दर्शाता है?", options: ["श्याम के प्रकट होने का स्थान", "स्नान का कुंड", "दान का कुंड", "पूजा का स्थल"], correct: 0 },
    { question: "बर्बरीक की माता के नाम क्या-क्या हैं?", options: ["हिडिम्बा", "मोरवी", "कामकंटकटा", "सभी नाम"], correct: 3 },
    { question: "फाल्गुन मेला कब लगता है?", options: ["अमावस्या पर", "पूर्णिमा पर", "षष्ठी से बारस तक", "एकादशी पर"], correct: 2 },
    { question: "क्या खाटू श्याम जी कृष्ण के कलियुगी अवतार हैं?", options: ["राम के अवतार", "शिव के अवतार", "हाँ", "नहीं"], correct: 2 },
    { question: "महाभारत में ब्राह्मण रूप धारण करके किसने बर्बरीक की परीक्षा ली?", options: ["बर्बरीक ने कृष्ण की", "भीम ने", "कृष्ण ने बर्बरीक की", "अर्जुन ने"], correct: 2 },
    { question: "युद्ध समाप्ति के बाद बर्बरीक ने जीत का श्रेय किसे दिया?", options: ["पांडवों को", "कृष्ण को", "कौरवों को", "बर्बरीक को"], correct: 1 },
    { question: "खाटू श्याम मंदिर का निर्माण किस-किसने करवाया?", options: ["अभय सिंह", "सभी", "नर्मदा कंवर", "रूप सिंह चौहान"], correct: 1 },
    { question: "श्याम कुंड में क्या विशेष प्राप्त माना जाता है?", options: ["ध्वज", "प्रसाद", "बाबा का आशीर्वाद", "आरती"], correct: 2 },
    { question: "कार्तिक शुक्ल एकादशी का खाटू श्याम के लिए क्या महत्व है?", options: ["दान", "आरती", "मेला", "जन्मोत्सव"], correct: 3 },
    { question: "क्या बर्बरीक अपने पिता से अधिक शक्तिशाली थे?", options: ["भीम से", "अर्जुन से", "कर्ण से", "घटोत्कच से"], correct: 3 },
    { question: "मंदिर में जगमोहन क्या है?", options: ["गर्भगृह", "कुंड", "प्रार्थना हॉल", "बाग"], correct: 2 },
    { question: "खाटू श्याम चालीसा का पहला चौपाई क्या है?", options: ["जय जय श्याम", "हारे का सहारा", "श्याम-श्याम भजि बारंबारा", "इच्छा पूर्ण"], correct: 2 },
    { question: "श्याम चालीसा में किन-किन की तारिफ की गई है?", options: ["गणिका", "सभी", "अहिल्या", "अजामिल"], correct: 1 },
    { question: "क्या खाटू श्याम जी बैजंती माला धारण करते हैं?", options: ["हाँ", "नहीं", "नहीं", "कभी"], correct: 0 },
    { question: "श्याम चालीसा में मुरली को कैसे बजाया गया वर्णित है?", options: ["चहु दिशा में", "नहीं", "रात में", "एक दिशा में"], correct: 0 },
    { question: "बांसुरी के स्वर से क्या प्रभाव पड़ा?", options: ["सब सो गए", "सब मुग्ध हो गए", "सब भाग गए", "सब डर गए"], correct: 1 },
    { question: "क्या खाटू में श्याम कन्हैया रूप में विराजमान हैं?", options: ["नहीं", "हाँ", "मथुरा में", "द्वारका में"], correct: 1 },
    { question: "श्याम भजन से भक्त को क्या प्राप्त होता है?", options: ["निस्तारा", "दुख", "सभी", "रोग"], correct: 0 },
    { question: "खाटू श्याम के चमत्कार की मुख्य कहानियाँ क्या हैं?", options: ["भक्त की रक्षा", "ध्वज चढ़ाना", "मंदिर निर्माण", "सभी"], correct: 3 },
    { question: "औरंगजेब के सैनिकों पर क्या चमत्कार हुआ?", options: ["शिवलिंग से रक्त बहा", "मंदिर गिर गया", "कुंड सूख गया", "ध्वज गिर गया"], correct: 0 },
    { question: "श्याम बाबा की संध्या आरती कब होती है?", options: ["रात केवल", "दोपहर में", "सुबह केवल", "शाम 7:30 बजे"], correct: 3 },
    { question: "खाटू श्याम मंदिर में प्रवेश शुल्क क्या है?", options: ["100 रुपये", "50 रुपये", "निशुल्क", "200 रुपये"], correct: 2 },
    { question: "मंदिर के पास कौन सा अन्य मंदिर है?", options: ["विष्णु मंदिर", "शिव मंदिर", "राम मंदिर", "गौरीशंकर मंदिर"], correct: 3 },
    { question: "श्याम ध्वज कितने समय तक मंदिर पर रहता है?", options: ["12 महीने", "1 महीना", "6 महीने", "3 महीने"], correct: 0 },
    { question: "मंदिर के निर्माण में मुख्य सामग्री क्या थी?", options: ["मकराना संगमरमर", "सफेद संगमरमर", "काला पत्थर", "लाल पत्थर"], correct: 0 },
    { question: "बर्बरीक नाम का अर्थ क्या है?", options: ["शत्रु विनाशक", "युद्ध जीतने वाला", "दान दाता", "मित्र रक्षक"], correct: 0 },
    { question: "खाटू श्याम की पूजा का मुख्य समय क्या है?", options: ["केवल शाम को", "रात में", "दिन में", "सुबह-शाम"], correct: 3 },
    { question: "मेले में कितने श्रद्धालु आते हैं?", options: ["लाखों", "नहीं", "दस हजार", "हजार"], correct: 0 },
    { question: "श्याम चालीसा के लाभ क्या हैं?", options: ["सभी", "मनोकामना पूर्ति", "धन", "पुत्र"], correct: 0 },
    { question: "बर्बरीक ने युद्ध कैसे देखा?", options: ["केवल शुरू में", "नहीं देखा", "पूर्ण रूप से", "शीश से"], correct: 3 },
    { question: "खाटू श्याम का प्रसिद्ध भजन कौन सा है?", options: ["हारे का सहारा", "शिव भजन", "राम भजन", "विष्णु भजन"], correct: 0 },
    { question: "मंदिर के ध्वज का मुख्य रंग क्या है?", options: ["हरा काला", "लाल पीला", "सफेद नीला", "सफेद लाल"], correct: 2 },
    { question: "श्याम कुंड का मुख्य महत्व क्या है?", options: ["पूजा", "प्रकटी स्थल", "स्नान", "दर्शन"], correct: 1 },
    { question: "खाटू श्याम यात्रा के मुख्य साधन क्या हैं?", options: ["ट्रेन और बस", "हवा द्वारा", "पैदल केवल", "कार केवल"], correct: 0 },
    { question: "मंदिर की सजावट में क्या उपयोग होता है?", options: ["सादा", "सुंदर टाइल्स", "बिना टाइल्स", "कांच"], correct: 1 },
    { question: "श्याम चालीसा की रचना काल क्या है?", options: ["परंपरागत", "तुलसी काल", "सूर काल", "कबीर काल"], correct: 0 },
    { question: "क्या बर्बरीक मायावी योद्धा थे?", options: ["ज्यादा", "नहीं", "हाँ", "कम"], correct: 2 },
    { question: "मंदिर का मुख्य द्वार किससे बना है?", options: ["पीतल", "लकड़ी", "विशेष पत्थर", "लोहा"], correct: 2 },
    { question: "खाटू श्याम दर्शन के मुख्य लाभ क्या हैं?", options: ["सभी", "धन", "शांति और सुख", "रोग नाश"], correct: 0 },
    { question: "फाल्गुन मेले का दूसरा नाम क्या है?", options: ["ग्यारस मेला", "लक्खी मेला", "जन्माष्टमी मेला", "देवउठनी मेला"], correct: 1 },
    { question: "भक्त खाटू श्याम को कैसे पुकारते हैं?", options: ["श्याम बाबा", "शिव", "कृष्ण", "राम"], correct: 0 },
    { question: "मंदिर कमेटी के चुनाव कब होते हैं?", options: ["समय-समय पर", "नहीं होते", "वार्षिक", "हर 5 साल"], correct: 0 },
    { question: "श्याम चालीसा में श्याम के नाम अनंत हैं?", options: ["हाँ", "नहीं", "20", "10"], correct: 0 },
    { question: "बर्बरीक के बलिदान से कौन प्रसन्न हुए?", options: ["कौरव प्रसन्न", "कृष्ण प्रसन्न", "देवता प्रसन्न", "पांडव प्रसन्न"], correct: 1 },
    { question: "मंदिर की चित्रकारी कैसी है?", options: ["नहीं", "आधुनिक", "प्राचीन", "सादा"], correct: 2 },
    { question: "खाटू श्याम की आरतियाँ कितनी हैं?", options: ["1", "7", "5", "3"], correct: 2 },
    { question: "खाटू श्याम का वास कहाँ माना जाता है?", options: ["द्वारका", "हस्तिनापुर", "मथुरा", "विराटनगर गुप्त रूप में"], correct: 3 },
    { question: "मंदिर का मुख्य महत्व क्या है?", options: ["धन", "आत्म शांति", "सभी", "पुत्र प्राप्ति"], correct: 2 },
    { question: "खाटू श्याम का मुख्य संदेश क्या है?", options: ["क्रोध", "मोह", "लोभ", "दया और करुणा"], correct: 3 },
    { question: "बर्बरीक से दान किसने मांगा?", options: ["कृष्ण ने शीश मांगा", "अर्जुन ने", "बर्बरीक ने मांगा", "भीम ने"], correct: 0 },
    { question: "मंदिर निर्माण का स्वप्न किसे आया?", options: ["किसान को", "ब्राह्मण को", "गाय को", "शासक को"], correct: 3 },
    { question: "खाटू में गाय ने दूध कहाँ बहाया?", options: ["नहीं", "कहीं भी", "रात में", "विशेष स्थान पर"], correct: 3 },
    { question: "खुदाई में मिले बॉक्स में क्या था?", options: ["प्रसाद", "चांदी", "सोना", "बर्बरीक लिखा सिर कंकाल"], correct: 3 },
    { question: "खुदाई की गहराई कितनी थी जब शीश मिला?", options: ["कुंड की गहराई", "मंदिर की ऊँचाई", "30 फीट", "ध्वज की ऊँचाई"], correct: 2 },
    { question: "श्याम बाबा का शालीग्राम रूप कहाँ है?", options: ["मंदिर में", "नहीं", "कुंड में", "ध्वज पर"], correct: 2 },
    { question: "हिडिम्बा कौन थीं?", options: ["माता", "बहन", "भाई", "पिता"], correct: 0 },
    { question: "भीम ने किसका सामना किया?", options: ["पांडवों से", "कौरवों से", "राक्षस से", "हिडिम्बा से"], correct: 3 },
    { question: "घटोत्कच का नाम क्या है?", options: ["घटोखा", "भीम पुत्र", "बर्बरीक", "हिडिम्बा पुत्र"], correct: 3 },
    { question: "युद्ध देखने की इच्छा किसकी थी?", options: ["बर्बरीक की", "अर्जुन की", "भीम की", "कृष्ण की"], correct: 0 },
    { question: "शीश को पहाड़ी पर क्यों रखा गया?", options: ["दफनाने के लिए", "फेंकने के लिए", "पूजने के लिए", "युद्ध देखने के लिए"], correct: 3 },
    { question: "महाभारत युद्ध की जीत का श्रेय किसे दिया गया?", options: ["पांडवों को", "कृष्ण को", "देवताओं को", "बर्बरीक को"], correct: 1 }
];
    let currentQuiz = [];
    let currentQuestionIndex = 0;
    let correctCount = 0;
    let selectedOption = null;
    const startScreen = document.getElementById('chalisahub-start-screen');
    const quizScreen = document.getElementById('chalisahub-quiz-screen');
    const endScreen = document.getElementById('chalisahub-end-screen');
    const questionDisplay = document.getElementById('chalisahub-question-display');
    const optionsDisplay = document.getElementById('chalisahub-options-display');
    const feedbackDisplay = document.getElementById('chalisahub-feedback-display');
    const nextBtn = document.getElementById('chalisahub-next-btn');
    const playBtn = document.getElementById('chalisahub-play-quiz-btn');
    const replayBtn = document.getElementById('chalisahub-replay-btn');
    const progressFill = document.getElementById('chalisahub-progress-fill');
    const progressText = document.getElementById('chalisahub-progress-text');
    const timerDisplay = document.getElementById('chalisahub-timer-display');
    const finalCorrectEl = document.getElementById('chalisahub-final-correct');
    const totalQuestionsEl = document.getElementById('chalisahub-total-questions');
    const quizContainer = document.getElementById('chalisahub-quiz-container');

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
        progressFill.style.width = `${progress}%`;
        progressFill.setAttribute('aria-valuenow', Math.round(progress));
        progressText.textContent = `${currentQuestionIndex + 1}/${TOTAL_QUESTIONS}`;
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function startTotalTimer() {
        timeLeft = TOTAL_TIMER_DURATION;
        timerDisplay.textContent = formatTime(timeLeft);
        quizContainer.classList.remove('low-time');
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
            if (timeLeft <= LOW_TIME_THRESHOLD) {
                quizContainer.classList.add('low-time');
            }
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        quizContainer.classList.remove('low-time');
    }

    function startQuiz() {
        currentQuiz = shuffleArray([...QUIZ_QUESTIONS]);
        currentQuestionIndex = 0;
        correctCount = 0;
        selectedOption = null;
        startScreen.style.display = 'none';
        endScreen.style.display = 'none';
        quizScreen.style.display = 'flex';
        nextBtn.style.display = 'none';
        nextBtn.disabled = true;
        updateProgressBar();
        startTotalTimer();
        showQuestion();
    }

    function showQuestion() {
        const question = currentQuiz[currentQuestionIndex];
        questionDisplay.innerHTML = `<span>सवाल ${currentQuestionIndex + 1}:</span> ${question.question}`;
        questionDisplay.setAttribute('id', `chalisahub-question-${currentQuestionIndex + 1}`);
        optionsDisplay.innerHTML = '';
        optionsDisplay.setAttribute('aria-labelledby', `chalisahub-question-${currentQuestionIndex + 1}`);
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'chalisahub-option-btn';
            optionBtn.setAttribute('data-letter', String.fromCharCode(65 + index));
            optionBtn.setAttribute('role', 'radio');
            optionBtn.setAttribute('aria-checked', 'false');
            optionBtn.innerHTML = `<span>${option}</span>`;
            optionBtn.addEventListener('click', () => selectOption(index));
            optionsDisplay.appendChild(optionBtn);
        });
        feedbackDisplay.style.display = 'none';
        nextBtn.style.display = 'block';
        nextBtn.disabled = true;
        selectedOption = null;
        updateProgressBar();
    }

    function selectOption(index) {
        if (selectedOption !== null) return;
        selectedOption = index;
        const optionButtons = optionsDisplay.querySelectorAll('.chalisahub-option-btn');
        const correctIndex = currentQuiz[currentQuestionIndex].correct;
        optionButtons.forEach((btn, i) => {
            btn.setAttribute('aria-checked', i === index ? 'true' : 'false');
            if (i === correctIndex) {
                btn.classList.add('correct');
            } else if (i === index && i !== correctIndex) {
                btn.classList.add('incorrect');
            }
        });
        if (index === correctIndex) {
            correctCount++;
            feedbackDisplay.innerHTML = '<span>✅ सही उत्तर! श्याम बाबा की कृपा।</span>';
            feedbackDisplay.className = 'chalisahub-feedback-display correct';
        } else {
            const correctOption = currentQuiz[currentQuestionIndex].options[correctIndex];
            feedbackDisplay.innerHTML = `<span>❌ गलत! सही उत्तर: <strong>${String.fromCharCode(65 + correctIndex)}. ${correctOption}</strong></span>`;
            feedbackDisplay.className = 'chalisahub-feedback-display incorrect';
        }
        feedbackDisplay.style.display = 'block';
        nextBtn.disabled = false;
    }

    function nextQuestion() {
        if (selectedOption === null) return;
        currentQuestionIndex++;
        if (currentQuestionIndex < TOTAL_QUESTIONS) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        stopTimer();
        quizScreen.style.display = 'none';
        endScreen.style.display = 'flex';
        finalCorrectEl.textContent = correctCount;
        totalQuestionsEl.textContent = TOTAL_QUESTIONS;
    }

    playBtn.addEventListener('click', startQuiz);
    replayBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    progressFill.setAttribute('aria-valuenow', 0);
    progressText.textContent = `1/${TOTAL_QUESTIONS}`;
});